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
exports.ServiceOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_order_entity_1 = require("./entities/service-order.entity");
const service_part_entity_1 = require("./entities/service-part.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const mechanic_entity_1 = require("../mechanics/entities/mechanic.entity");
const spare_part_entity_1 = require("../spare-parts/entities/spare-part.entity");
const inventory_transaction_entity_1 = require("../inventory-transactions/entities/inventory-transaction.entity");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
const service_order_status_enum_1 = require("../../common/enums/service-order-status.enum");
const transaction_type_enum_1 = require("../../common/enums/transaction-type.enum");
let ServiceOrdersService = class ServiceOrdersService {
    serviceOrderRepository;
    servicePartRepository;
    customerRepository;
    vehicleRepository;
    mechanicRepository;
    sparePartRepository;
    inventoryTransactionRepository;
    dataSource;
    constructor(serviceOrderRepository, servicePartRepository, customerRepository, vehicleRepository, mechanicRepository, sparePartRepository, inventoryTransactionRepository, dataSource) {
        this.serviceOrderRepository = serviceOrderRepository;
        this.servicePartRepository = servicePartRepository;
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.mechanicRepository = mechanicRepository;
        this.sparePartRepository = sparePartRepository;
        this.inventoryTransactionRepository = inventoryTransactionRepository;
        this.dataSource = dataSource;
    }
    async create(createServiceOrderDto) {
        const customer = await this.customerRepository.findOne({
            where: { id: createServiceOrderDto.customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${createServiceOrderDto.customerId} not found`);
        }
        const vehicle = await this.vehicleRepository.findOne({
            where: {
                id: createServiceOrderDto.vehicleId,
                customerId: createServiceOrderDto.customerId,
            },
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${createServiceOrderDto.vehicleId} not found for this customer`);
        }
        if (createServiceOrderDto.assignedMechanicId) {
            const mechanic = await this.mechanicRepository.findOne({
                where: { id: createServiceOrderDto.assignedMechanicId },
            });
            if (!mechanic) {
                throw new common_1.NotFoundException(`Mechanic with ID ${createServiceOrderDto.assignedMechanicId} not found`);
            }
        }
        const orderNumber = await this.generateOrderNumber();
        const serviceOrder = this.serviceOrderRepository.create({
            ...createServiceOrderDto,
            orderNumber,
            laborCost: createServiceOrderDto.laborCost || 0,
            startDate: createServiceOrderDto.startDate ? new Date(createServiceOrderDto.startDate) : undefined,
        });
        return await this.serviceOrderRepository.save(serviceOrder);
    }
    async findAll(query) {
        const { page = 1, limit = 20, customerId, vehicleId, mechanicId, status, priority, search } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.serviceOrderRepository
            .createQueryBuilder('serviceOrder')
            .leftJoinAndSelect('serviceOrder.customer', 'customer')
            .leftJoinAndSelect('serviceOrder.vehicle', 'vehicle')
            .leftJoinAndSelect('serviceOrder.assignedMechanic', 'mechanic')
            .leftJoinAndSelect('mechanic.user', 'mechanicUser')
            .leftJoinAndSelect('serviceOrder.serviceParts', 'serviceParts')
            .leftJoinAndSelect('serviceParts.part', 'part');
        if (customerId) {
            queryBuilder.andWhere('serviceOrder.customerId = :customerId', { customerId });
        }
        if (vehicleId) {
            queryBuilder.andWhere('serviceOrder.vehicleId = :vehicleId', { vehicleId });
        }
        if (mechanicId) {
            queryBuilder.andWhere('serviceOrder.assignedMechanicId = :mechanicId', { mechanicId });
        }
        if (status) {
            queryBuilder.andWhere('serviceOrder.status = :status', { status });
        }
        if (priority) {
            queryBuilder.andWhere('serviceOrder.priority = :priority', { priority });
        }
        if (search) {
            queryBuilder.andWhere('(serviceOrder.orderNumber ILIKE :search OR serviceOrder.issueDescription ILIKE :search OR serviceOrder.diagnosis ILIKE :search)', { search: `%${search}%` });
        }
        const [data, total] = await queryBuilder
            .orderBy('serviceOrder.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return new pagination_response_dto_1.PaginationResponseDto(data, page, limit, total);
    }
    async findOne(id) {
        const serviceOrder = await this.serviceOrderRepository.findOne({
            where: { id },
            relations: [
                'customer',
                'vehicle',
                'assignedMechanic',
                'assignedMechanic.user',
                'serviceParts',
                'serviceParts.part',
                'invoice',
                'invoice.payments',
            ],
        });
        if (!serviceOrder) {
            throw new common_1.NotFoundException(`Service order with ID ${id} not found`);
        }
        return serviceOrder;
    }
    async update(id, updateServiceOrderDto) {
        const serviceOrder = await this.findOne(id);
        if (updateServiceOrderDto.assignedMechanicId) {
            const mechanic = await this.mechanicRepository.findOne({
                where: { id: updateServiceOrderDto.assignedMechanicId },
            });
            if (!mechanic) {
                throw new common_1.NotFoundException(`Mechanic with ID ${updateServiceOrderDto.assignedMechanicId} not found`);
            }
        }
        if (updateServiceOrderDto.status === service_order_status_enum_1.ServiceOrderStatus.COMPLETED && !serviceOrder.completionDate) {
            updateServiceOrderDto.completionDate = new Date().toISOString();
        }
        Object.assign(serviceOrder, {
            ...updateServiceOrderDto,
            startDate: updateServiceOrderDto.startDate ? new Date(updateServiceOrderDto.startDate) : serviceOrder.startDate,
            completionDate: updateServiceOrderDto.completionDate ? new Date(updateServiceOrderDto.completionDate) : serviceOrder.completionDate,
        });
        return await this.serviceOrderRepository.save(serviceOrder);
    }
    async remove(id) {
        const serviceOrder = await this.findOne(id);
        if (serviceOrder.status !== service_order_status_enum_1.ServiceOrderStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending service orders can be deleted');
        }
        await this.serviceOrderRepository.softDelete(id);
    }
    async addParts(id, addPartsDto) {
        return await this.dataSource.transaction(async (manager) => {
            const serviceOrder = await manager.findOne(service_order_entity_1.ServiceOrder, {
                where: { id },
                relations: ['serviceParts'],
            });
            if (!serviceOrder) {
                throw new common_1.NotFoundException(`Service order with ID ${id} not found`);
            }
            if (serviceOrder.status === service_order_status_enum_1.ServiceOrderStatus.COMPLETED) {
                throw new common_1.BadRequestException('Cannot add parts to completed service order');
            }
            for (const partDto of addPartsDto.parts) {
                const sparePart = await manager.findOne(spare_part_entity_1.SparePart, {
                    where: { id: partDto.partId },
                });
                if (!sparePart) {
                    throw new common_1.NotFoundException(`Spare part with ID ${partDto.partId} not found`);
                }
                if (sparePart.quantity < partDto.quantity) {
                    throw new common_1.BadRequestException(`Insufficient quantity for part ${sparePart.name}. Available: ${sparePart.quantity}, Required: ${partDto.quantity}`);
                }
                const unitPrice = partDto.unitPrice || parseFloat(sparePart.sellingPrice.toString());
                const totalPrice = unitPrice * partDto.quantity;
                const servicePart = manager.create(service_part_entity_1.ServicePart, {
                    serviceOrderId: id,
                    partId: partDto.partId,
                    quantity: partDto.quantity,
                    unitPrice,
                    totalPrice,
                });
                await manager.save(service_part_entity_1.ServicePart, servicePart);
                sparePart.quantity -= partDto.quantity;
                await manager.save(spare_part_entity_1.SparePart, sparePart);
                const inventoryTransaction = manager.create(inventory_transaction_entity_1.InventoryTransaction, {
                    partId: partDto.partId,
                    type: transaction_type_enum_1.TransactionType.SALE,
                    quantity: -partDto.quantity,
                    reason: `Used in service order ${serviceOrder.orderNumber}`,
                    referenceId: id,
                });
                await manager.save(inventory_transaction_entity_1.InventoryTransaction, inventoryTransaction);
            }
            const updatedServiceOrder = await manager.findOne(service_order_entity_1.ServiceOrder, {
                where: { id },
                relations: [
                    'customer',
                    'vehicle',
                    'assignedMechanic',
                    'assignedMechanic.user',
                    'serviceParts',
                    'serviceParts.part',
                ],
            });
            if (!updatedServiceOrder) {
                throw new common_1.NotFoundException(`Service order with ID ${id} not found after update`);
            }
            return updatedServiceOrder;
        });
    }
    async getServiceHistory(vehicleId) {
        return await this.serviceOrderRepository.find({
            where: { vehicleId },
            relations: [
                'assignedMechanic',
                'assignedMechanic.user',
                'serviceParts',
                'serviceParts.part',
                'invoice',
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async getTotalCost(id) {
        const serviceOrder = await this.serviceOrderRepository.findOne({
            where: { id },
            relations: ['serviceParts'],
        });
        if (!serviceOrder) {
            throw new common_1.NotFoundException(`Service order with ID ${id} not found`);
        }
        const laborCost = parseFloat(serviceOrder.laborCost.toString());
        const partsCost = serviceOrder.serviceParts?.reduce((sum, servicePart) => sum + parseFloat(servicePart.totalPrice.toString()), 0) || 0;
        return {
            laborCost,
            partsCost,
            totalCost: laborCost + partsCost,
        };
    }
    async generateOrderNumber() {
        const prefix = 'SO';
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const latestOrder = await this.serviceOrderRepository
            .createQueryBuilder('serviceOrder')
            .where('serviceOrder.orderNumber LIKE :pattern', {
            pattern: `${prefix}${year}${month}%`
        })
            .orderBy('serviceOrder.orderNumber', 'DESC')
            .getOne();
        let sequence = 1;
        if (latestOrder) {
            const lastSequence = parseInt(latestOrder.orderNumber.slice(-4));
            sequence = lastSequence + 1;
        }
        return `${prefix}${year}${month}${sequence.toString().padStart(4, '0')}`;
    }
};
exports.ServiceOrdersService = ServiceOrdersService;
exports.ServiceOrdersService = ServiceOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_order_entity_1.ServiceOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(service_part_entity_1.ServicePart)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(3, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(4, (0, typeorm_1.InjectRepository)(mechanic_entity_1.Mechanic)),
    __param(5, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __param(6, (0, typeorm_1.InjectRepository)(inventory_transaction_entity_1.InventoryTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ServiceOrdersService);
//# sourceMappingURL=service-orders.service.js.map