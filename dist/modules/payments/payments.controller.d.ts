import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findOne(id: string): Promise<Payment>;
}
