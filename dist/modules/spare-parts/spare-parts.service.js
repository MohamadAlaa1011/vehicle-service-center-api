"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparePartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const spare_part_entity_1 = require("./entities/spare-part.entity");
const supplier_entity_1 = require("../suppliers/entities/supplier.entity");
const inventory_transaction_entity_1 = require("../inventory-transactions/entities/inventory-transaction.entity");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
const transaction_type_enum_1 = require("../../common/enums/transaction-type.enum");
let SparePartsService = class SparePartsService {
    sparePartRepository;
    supplierRepository;
    inventoryTransactionRepository;
    dataSource;
    constructor(sparePartRepository, supplierRepository, inventoryTransactionRepository, dataSource) {
        this.sparePartRepository = sparePartRepository;
        this.supplierRepository = supplierRepository;
        this.inventoryTransactionRepository = inventoryTransactionRepository;
        this.dataSource = dataSource;
    }
    async create(createSparePartDto) {
        const { supplierId, sku, ...sparePartData } = createSparePartDto;
        const supplier = await this.supplierRepository.findOne({
            where: { id: supplierId },
        });
        if (!supplier) {
            throw new common_1.BadRequestException('Supplier not found');
        }
        const existingSparePart = await this.sparePartRepository.findOne({
            where: { sku },
        });
        if (existingSparePart) {
            throw new common_1.ConflictException('Spare part with this SKU already exists');
        }
        if (createSparePartDto.sellingPrice < createSparePartDto.purchasePrice) {
            throw new common_1.BadRequestException('Selling price cannot be less than purchase price');
        }
        const sparePart = this.sparePartRepository.create({
            ...sparePartData,
            sku,
            supplierId,
        });
        const savedPart = await this.sparePartRepository.save(sparePart);
        if (savedPart.quantity > 0) {
            await this.createInventoryTransaction(savedPart.id, transaction_type_enum_1.TransactionType.PURCHASE, savedPart.quantity, 'Initial stock');
        }
        return savedPart;
    }
    async findAll(queryDto) {
        const { page = 1, limit = 20, search, category, supplierId, lowStock, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            relations: ['supplier'],
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        const whereConditions = {};
        if (category) {
            whereConditions.category = category;
        }
        if (supplierId) {
            whereConditions.supplierId = supplierId;
        }
        if (search) {
            const searchConditions = [
                { ...whereConditions, name: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, sku: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, description: (0, typeorm_2.Like)(`%${search}%`) },
            ];
            queryOptions.where = searchConditions;
        }
        else {
            queryOptions.where = whereConditions;
        }
        let [spareParts, total] = await this.sparePartRepository.findAndCount(queryOptions);
        if (lowStock) {
            spareParts = spareParts.filter(part => part.quantity <= part.minimumStock);
            total = spareParts.length;
        }
        return new pagination_response_dto_1.PaginationResponseDto(spareParts, page, limit, total);
    }
    async findOne(id) {
        const sparePart = await this.sparePartRepository.findOne({
            where: { id },
            relations: ['supplier', 'inventoryTransactions'],
        });
        if (!sparePart) {
            throw new common_1.NotFoundException(`Spare part with ID ${id} not found`);
        }
        return sparePart;
    }
    async update(id, updateSparePartDto) {
        const sparePart = await this.findOne(id);
        const { sku, supplierId, ...updateData } = updateSparePartDto;
        if (sku && sku !== sparePart.sku) {
            const existingSparePart = await this.sparePartRepository.findOne({
                where: { sku },
            });
            if (existingSparePart) {
                throw new common_1.ConflictException('Spare part with this SKU already exists');
            }
        }
        if (supplierId && supplierId !== sparePart.supplierId) {
            const supplier = await this.supplierRepository.findOne({
                where: { id: supplierId },
            });
            if (!supplier) {
                throw new common_1.BadRequestException('Supplier not found');
            }
        }
        const newPurchasePrice = updateSparePartDto.purchasePrice ?? sparePart.purchasePrice;
        const newSellingPrice = updateSparePartDto.sellingPrice ?? sparePart.sellingPrice;
        if (newSellingPrice < newPurchasePrice) {
            throw new common_1.BadRequestException('Selling price cannot be less than purchase price');
        }
        await this.sparePartRepository.update(id, {
            ...updateData,
            ...(sku && { sku }),
            ...(supplierId && { supplierId }),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const sparePart = await this.findOne(id);
        await this.sparePartRepository.softDelete(id);
    }
    async getLowStockAlerts() {
        return this.sparePartRepository
            .createQueryBuilder('sparePart')
            .leftJoinAndSelect('sparePart.supplier', 'supplier')
            .where('sparePart.quantity <= sparePart.minimumStock')
            .orderBy('sparePart.quantity', 'ASC')
            .getMany();
    }
    async adjustStock(id, adjustStockDto) {
        const { type, quantity, reason } = adjustStockDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const sparePart = await queryRunner.manager.findOne(spare_part_entity_1.SparePart, {
                where: { id },
            });
            if (!sparePart) {
                throw new common_1.NotFoundException(`Spare part with ID ${id} not found`);
            }
            let newQuantity = sparePart.quantity;
            switch (type) {
                case transaction_type_enum_1.TransactionType.PURCHASE:
                    newQuantity += Math.abs(quantity);
                    break;
                case transaction_type_enum_1.TransactionType.SALE:
                    newQuantity -= Math.abs(quantity);
                    break;
                case transaction_type_enum_1.TransactionType.ADJUSTMENT:
                    newQuantity += quantity;
                    break;
                case transaction_type_enum_1.TransactionType.RETURN:
                    newQuantity += Math.abs(quantity);
                    break;
            }
            if (newQuantity < 0) {
                throw new common_1.BadRequestException('Insufficient stock for this operation');
            }
            await queryRunner.manager.update(spare_part_entity_1.SparePart, id, { quantity: newQuantity });
            const transaction = queryRunner.manager.create(inventory_transaction_entity_1.InventoryTransaction, {
                partId: id,
                type,
                quantity: Math.abs(quantity),
                reason,
            });
            await queryRunner.manager.save(inventory_transaction_entity_1.InventoryTransaction, transaction);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createInventoryTransaction(partId, type, quantity, reason, referenceId) {
        const transaction = this.inventoryTransactionRepository.create({
            partId,
            type,
            quantity: Math.abs(quantity),
            reason,
            referenceId,
        });
        return this.inventoryTransactionRepository.save(transaction);
    }
    async getPartsByCategory() {
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
};
exports.SparePartsService = SparePartsService;
exports.SparePartsService = SparePartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __param(1, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_transaction_entity_1.InventoryTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SparePartsService);
//# sourceMappingURL=spare-parts.service.js.map