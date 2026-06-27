import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private paymentRepository;
    private invoiceRepository;
    private dataSource;
    private readonly logger;
    constructor(paymentRepository: Repository<Payment>, invoiceRepository: Repository<Invoice>, dataSource: DataSource);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findOne(id: string): Promise<Payment>;
}
