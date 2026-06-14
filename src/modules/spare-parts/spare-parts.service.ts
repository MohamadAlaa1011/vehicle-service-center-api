import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions, DataSource } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { CreateSparePartDto, UpdateSparePartDto, QuerySparePartDto, AdjustStockDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { TransactionType } from '../../common/enums/transaction-type.enum';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(InventoryTransaction)
    private inventoryTransactionRepository: Repository<InventoryTransaction>,
    private dataSource: DataSource,
  ) {}

  async create(createSparePartDto: CreateSparePartDto): Promise<SparePart> {
    const { supplierId, sku, ...sparePartData } = createSparePartDto;

    // Verify supplier exists
    const supplier = await this.supplierRepository.findOne({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new BadRequestException('Supplier not found');
    }

    // Check for SKU conflicts
    const existingSparePart = await this.sparePartRepository.findOne({
      where: { sku },
    });

    if (existingSparePart) {
      throw new ConflictException('Spare part with this SKU already exists');
    }

    // Validate pricing
    if (createSparePartDto.sellingPrice < createSparePartDto.purchasePrice) {
      throw new BadRequestException('Selling price cannot be less than purchase price');
    }

    const sparePart = this.sparePartRepository.create({
      ...sparePartData,
      sku,
      supplierId,
    });

    const savedPart = await this.sparePartRepository.save(sparePart);

    // Create initial inventory transaction if quantity > 0
    if (savedPart.quantity > 0) {
      await this.createInventoryTransaction(
        savedPart.id,
        TransactionType.PURCHASE,
        savedPart.quantity,
        'Initial stock',
      );
    }

    return savedPart;
  }

  async findAll(queryDto: QuerySparePartDto): Promise<PaginationResponseDto<SparePart>> {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      supplierId,
      lowStock,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<SparePart> = {
      relations: ['supplier'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    // Build where conditions
    const whereConditions: any = {};

    if (category) {
      whereConditions.category = category;
    }

    if (supplierId) {
      whereConditions.supplierId = supplierId;
    }

    // Handle search across multiple fields
    if (search) {
      const searchConditions = [
        { ...whereConditions, name: Like(`%${search}%`) },
        { ...whereConditions, sku: Like(`%${search}%`) },
        { ...whereConditions, description: Like(`%${search}%`) },
      ];

      queryOptions.where = searchConditions;
    } else {
      queryOptions.where = whereConditions;
    }

    let [spareParts, total] = await this.sparePartRepository.findAndCount(queryOptions);

    // Filter for low stock if requested
    if (lowStock) {
      spareParts = spareParts.filter(part => part.quantity <= part.minimumStock);
      total = spareParts.length;
    }

    return new PaginationResponseDto(spareParts, page, limit, total);
  }

  async findOne(id: string): Promise<SparePart> {
    const sparePart = await this.sparePartRepository.findOne({
      where: { id },
      relations: ['supplier', 'inventoryTransactions'],
    });

    if (!sparePart) {
      throw new NotFoundException(`Spare part with ID ${id} not found`);
    }

    return sparePart;
  }

  async update(id: string, updateSparePartDto: UpdateSparePartDto): Promise<SparePart> {
    const sparePart = await this.findOne(id);

    const { sku, supplierId, ...updateData } = updateSparePartDto;

    // Check for SKU conflicts if updating
    if (sku && sku !== sparePart.sku) {
      const existingSparePart = await this.sparePartRepository.findOne({
        where: { sku },
      });

      if (existingSparePart) {
        throw new ConflictException('Spare part with this SKU already exists');
      }
    }

    // Verify new supplier exists if updating
    if (supplierId && supplierId !== sparePart.supplierId) {
      const supplier = await this.supplierRepository.findOne({
        where: { id: supplierId },
      });

      if (!supplier) {
        throw new BadRequestException('Supplier not found');
      }
    }

    // Validate pricing if both are provided
    const newPurchasePrice = updateSparePartDto.purchasePrice ?? sparePart.purchasePrice;
    const newSellingPrice = updateSparePartDto.sellingPrice ?? sparePart.sellingPrice;

    if (newSellingPrice < newPurchasePrice) {
      throw new BadRequestException('Selling price cannot be less than purchase price');
    }

    await this.sparePartRepository.update(id, {
      ...updateData,
      ...(sku && { sku }),
      ...(supplierId && { supplierId }),
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const sparePart = await this.findOne(id);
    await this.sparePartRepository.softDelete(id);
  }

  async getLowStockAlerts(): Promise<SparePart[]> {
    return this.sparePartRepository
      .createQueryBuilder('sparePart')
      .leftJoinAndSelect('sparePart.supplier', 'supplier')
      .where('sparePart.quantity <= sparePart.minimumStock')
      .orderBy('sparePart.quantity', 'ASC')
      .getMany();
  }

  async adjustStock(id: string, adjustStockDto: AdjustStockDto): Promise<SparePart> {
    const { type, quantity, reason } = adjustStockDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sparePart = await queryRunner.manager.findOne(SparePart, {
        where: { id },
      });

      if (!sparePart) {
        throw new NotFoundException(`Spare part with ID ${id} not found`);
      }

      // Calculate new quantity based on transaction type
      let newQuantity = sparePart.quantity;

      switch (type) {
        case TransactionType.PURCHASE:
          newQuantity += Math.abs(quantity);
          break;
        case TransactionType.SALE:
          newQuantity -= Math.abs(quantity);
          break;
        case TransactionType.ADJUSTMENT:
          newQuantity += quantity; // Can be positive or negative
          break;
        case TransactionType.RETURN:
          newQuantity += Math.abs(quantity);
          break;
      }

      if (newQuantity < 0) {
        throw new BadRequestException('Insufficient stock for this operation');
      }

      // Update spare part quantity
      await queryRunner.manager.update(SparePart, id, { quantity: newQuantity });

      // Create inventory transaction record
      const transaction = queryRunner.manager.create(InventoryTransaction, {
        partId: id,
        type,
        quantity: Math.abs(quantity),
        reason,
      });

      await queryRunner.manager.save(InventoryTransaction, transaction);

      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createInventoryTransaction(
    partId: string,
    type: TransactionType,
    quantity: number,
    reason?: string,
    referenceId?: string,
  ): Promise<InventoryTransaction> {
    const transaction = this.inventoryTransactionRepository.create({
      partId,
      type,
      quantity: Math.abs(quantity),
      reason,
      referenceId,
    });

    return this.inventoryTransactionRepository.save(transaction);
  }

  async getPartsByCategory(): Promise<{ category: string; count: number; totalValue: number }[]> {
    const result = await this.sparePartRepository
      .createQueryBuilder('sparePart')
      .select('sparePart.category', 'category')
      .addSelect('COUNT(sparePart.id)', 'count')
      .addSelect('SUM(sparePart.quantity * sparePart.sellingPrice)', 'totalValue')
      .groupBy('sparePart.category')
      .orderBy('totalValue', 'DESC')
      .getRawMany();

    return result.map(item => ({
      category: item.category,
      count: parseInt(item.count),
      totalValue: parseFloat(item.totalValue) || 0,
    }));
  }
}