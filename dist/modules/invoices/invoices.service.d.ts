import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private invoiceRepository;
    private serviceOrderRepository;
    constructor(invoiceRepository: Repository<Invoice>, serviceOrderRepository: Repository<ServiceOrder>);
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findOne(id: string): Promise<Invoice>;
    markAsPaid(id: string): Promise<Invoice>;
    private generateInvoiceNumber;
}
