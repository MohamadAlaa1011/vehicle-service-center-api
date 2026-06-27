import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findOne(id: string): Promise<Invoice>;
    markAsPaid(id: string): Promise<Invoice>;
}
