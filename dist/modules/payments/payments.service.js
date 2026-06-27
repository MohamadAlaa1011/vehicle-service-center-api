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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const invoice_status_enum_1 = require("../../common/enums/invoice-status.enum");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    paymentRepository;
    invoiceRepository;
    dataSource;
    logger = new common_1.Logger(PaymentsService_1.name);
    constructor(paymentRepository, invoiceRepository, dataSource) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
        this.dataSource = dataSource;
    }
    async create(createPaymentDto) {
        try {
            this.logger.log(`Creating payment for invoice: ${createPaymentDto.invoiceId}`);
            const invoice = await this.invoiceRepository.findOne({
                where: { id: createPaymentDto.invoiceId },
                relations: ['payments'],
            });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice with ID ${createPaymentDto.invoiceId} not found`);
            }
            if (invoice.status === invoice_status_enum_1.InvoiceStatus.PAID) {
                throw new common_1.BadRequestException('Invoice is already fully paid');
            }
            const totalPaid = invoice.payments?.reduce((sum, payment) => sum + parseFloat(payment.amount.toString()), 0) || 0;
            const totalAmount = parseFloat(invoice.totalAmount.toString());
            const remainingAmount = totalAmount - totalPaid;
            if (createPaymentDto.amount > remainingAmount) {
                throw new common_1.BadRequestException(`Payment amount exceeds remaining balance. Remaining: ${remainingAmount}`);
            }
            const payment = this.paymentRepository.create({
                invoiceId: createPaymentDto.invoiceId,
                paymentMethod: createPaymentDto.paymentMethod,
                amount: createPaymentDto.amount,
                transactionReference: createPaymentDto.transactionReference,
                paymentDate: new Date(),
            });
            const savedPayment = await this.paymentRepository.save(payment);
            const newTotalPaid = totalPaid + createPaymentDto.amount;
            if (Math.abs(newTotalPaid - totalAmount) < 0.01) {
                await this.invoiceRepository.update(invoice.id, { status: invoice_status_enum_1.InvoiceStatus.PAID });
            }
            return savedPayment;
        }
        catch (error) {
            this.logger.error('Error creating payment', error);
            throw error;
        }
    }
    async findOne(id) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['invoice', 'invoice.serviceOrder'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map