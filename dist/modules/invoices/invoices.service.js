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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const service_order_entity_1 = require("../service-orders/entities/service-order.entity");
const service_order_status_enum_1 = require("../../common/enums/service-order-status.enum");
const invoice_status_enum_1 = require("../../common/enums/invoice-status.enum");
let InvoicesService = class InvoicesService {
    invoiceRepository;
    serviceOrderRepository;
    constructor(invoiceRepository, serviceOrderRepository) {
        this.invoiceRepository = invoiceRepository;
        this.serviceOrderRepository = serviceOrderRepository;
    }
    async create(createInvoiceDto) {
        const serviceOrder = await this.serviceOrderRepository.findOne({
            where: { id: createInvoiceDto.serviceOrderId },
            relations: ['serviceParts', 'invoice'],
        });
        if (!serviceOrder) {
            throw new common_1.NotFoundException(`Service order with ID ${createInvoiceDto.serviceOrderId} not found`);
        }
        if (serviceOrder.status !== service_order_status_enum_1.ServiceOrderStatus.COMPLETED) {
            throw new common_1.BadRequestException('Can only create invoice for completed service orders');
        }
        if (serviceOrder.invoice) {
            throw new common_1.BadRequestException('Invoice already exists for this service order');
        }
        const laborAmount = parseFloat(serviceOrder.laborCost.toString());
        const partsAmount = serviceOrder.serviceParts?.reduce((sum, servicePart) => sum + parseFloat(servicePart.totalPrice.toString()), 0) || 0;
        const subtotal = laborAmount + partsAmount;
        const discountAmount = createInvoiceDto.discountAmount || 0;
        const taxableAmount = subtotal - discountAmount;
        const taxRate = createInvoiceDto.taxRate || 0;
        const taxAmount = (taxableAmount * taxRate) / 100;
        const totalAmount = taxableAmount + taxAmount;
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
    async markAsPaid(id) {
        const invoice = await this.findOne(id);
        if (invoice.status === invoice_status_enum_1.InvoiceStatus.PAID) {
            throw new common_1.BadRequestException('Invoice is already marked as paid');
        }
        invoice.status = invoice_status_enum_1.InvoiceStatus.PAID;
        return await this.invoiceRepository.save(invoice);
    }
    async generateInvoiceNumber() {
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
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(service_order_entity_1.ServiceOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map