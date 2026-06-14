import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ServiceOrderStatus } from '../../common/enums/service-order-status.enum';
import { InvoiceStatus } from '../../common/enums/invoice-status.enum';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id: createInvoiceDto.serviceOrderId },
      relations: ['serviceParts', 'invoice'],
    });

    if (!serviceOrder) {
      throw new NotFoundException(`Service order with ID ${createInvoiceDto.serviceOrderId} not found`);
    }

    if (serviceOrder.status !== ServiceOrderStatus.COMPLETED) {
      throw new BadRequestException('Can only create invoice for completed service orders');
    }

    if (serviceOrder.invoice) {
      throw new BadRequestException('Invoice already exists for this service order');
    }

    // Calculate amounts
    const laborAmount = parseFloat(serviceOrder.laborCost.toString());
    const partsAmount = serviceOrder.serviceParts?.reduce(
      (sum, servicePart) => sum + parseFloat(servicePart.totalPrice.toString()),
      0
    ) || 0;

    const subtotal = laborAmount + partsAmount;
    const discountAmount = createInvoiceDto.discountAmount || 0;
    const taxableAmount = subtotal - discountAmount;
    const taxRate = createInvoiceDto.taxRate || 0;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const totalAmount = taxableAmount + taxAmount;

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber();

    const invoice = this.invoiceRepository.create({
      invoiceNumber,
      serviceOrderId: createInvoiceDto.serviceOrderId,
      laborAmount,
      partsAmount,
      taxAmount,
      discountAmount,
      totalAmount,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: [
        'serviceOrder',
        'serviceOrder.customer',
        'serviceOrder.vehicle',
        'serviceOrder.serviceParts',
        'serviceOrder.serviceParts.part',
        'payments',
      ],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async markAsPaid(id: string): Promise<Invoice> {
    const invoice = await this.findOne(id);
    
    if (invoice.status === InvoiceStatus.PAID) {
      throw new BadRequestException('Invoice is already marked as paid');
    }

    invoice.status = InvoiceStatus.PAID;
    return await this.invoiceRepository.save(invoice);
  }

  private async generateInvoiceNumber(): Promise<string> {
    const prefix = 'INV';
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    const latestInvoice = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.invoiceNumber LIKE :pattern', { 
        pattern: `${prefix}${year}${month}%` 
      })
      .orderBy('invoice.invoiceNumber', 'DESC')
      .getOne();

    let sequence = 1;
    if (latestInvoice) {
      const lastSequence = parseInt(latestInvoice.invoiceNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${month}${sequence.toString().padStart(4, '0')}`;
  }
}