import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InvoiceStatus } from '../../common/enums/invoice-status.enum';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    private dataSource: DataSource,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      this.logger.log(`Creating payment for invoice: ${createPaymentDto.invoiceId}`);
      
      // First validate outside transaction
      const invoice = await this.invoiceRepository.findOne({
        where: { id: createPaymentDto.invoiceId },
        relations: ['payments'],
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${createPaymentDto.invoiceId} not found`);
      }

      if (invoice.status === InvoiceStatus.PAID) {
        throw new BadRequestException('Invoice is already fully paid');
      }

      // Calculate total payments made
      const totalPaid = invoice.payments?.reduce(
        (sum, payment) => sum + parseFloat(payment.amount.toString()),
        0
      ) || 0;

      const totalAmount = parseFloat(invoice.totalAmount.toString());
      const remainingAmount = totalAmount - totalPaid;

      if (createPaymentDto.amount > remainingAmount) {
        throw new BadRequestException(`Payment amount exceeds remaining balance. Remaining: ${remainingAmount}`);
      }

      // Create payment using repository
      const payment = this.paymentRepository.create({
        invoiceId: createPaymentDto.invoiceId,
        paymentMethod: createPaymentDto.paymentMethod,
        amount: createPaymentDto.amount,
        transactionReference: createPaymentDto.transactionReference,
        paymentDate: new Date(),
      });

      const savedPayment = await this.paymentRepository.save(payment);

      // Check if invoice is fully paid and update status
      const newTotalPaid = totalPaid + createPaymentDto.amount;
      if (Math.abs(newTotalPaid - totalAmount) < 0.01) { // Handle floating point precision
        await this.invoiceRepository.update(invoice.id, { status: InvoiceStatus.PAID });
      }

      return savedPayment;
    } catch (error) {
      this.logger.error('Error creating payment', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['invoice', 'invoice.serviceOrder'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }
}