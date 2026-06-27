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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const service_order_entity_1 = require("../service-orders/entities/service-order.entity");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let CustomersService = class CustomersService {
    customerRepository;
    vehicleRepository;
    serviceOrderRepository;
    constructor(customerRepository, vehicleRepository, serviceOrderRepository) {
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.serviceOrderRepository = serviceOrderRepository;
    }
    async create(createCustomerDto) {
        if (createCustomerDto.email) {
            const existingCustomer = await this.customerRepository.findOne({
                where: { email: createCustomerDto.email },
            });
            if (existingCustomer) {
                throw new common_1.ConflictException('Customer with this email already exists');
            }
        }
        const customer = this.customerRepository.create(createCustomerDto);
        return this.customerRepository.save(customer);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 20, search, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        if (search) {
            queryOptions.where = [
                { fullName: (0, typeorm_2.Like)(`%${search}%`) },
                { email: (0, typeorm_2.Like)(`%${search}%`) },
                { phone: (0, typeorm_2.Like)(`%${search}%`) },
            ];
        }
        const [customers, total] = await this.customerRepository.findAndCount(queryOptions);
        return new pagination_response_dto_1.PaginationResponseDto(customers, page, limit, total);
    }
    async findOne(id) {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: ['vehicles', 'appointments', 'serviceOrders'],
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto) {
        const customer = await this.findOne(id);
        if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
            const existingCustomer = await this.customerRepository.findOne({
                where: { email: updateCustomerDto.email },
            });
            if (existingCustomer) {
                throw new common_1.ConflictException('Customer with this email already exists');
            }
        }
        await this.customerRepository.update(id, updateCustomerDto);
        return this.findOne(id);
    }
    async remove(id) {
        const customer = await this.findOne(id);
        await this.customerRepository.softDelete(id);
    }
    async getCustomerVehicles(customerId, queryDto) {
        await this.findOne(customerId);
        const { page = 1, limit = 20, search, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            where: { customerId },
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        if (search) {
            queryOptions.where = [
                { customerId, make: (0, typeorm_2.Like)(`%${search}%`) },
                { customerId, model: (0, typeorm_2.Like)(`%${search}%`) },
                { customerId, plateNumber: (0, typeorm_2.Like)(`%${search}%`) },
                { customerId, vinNumber: (0, typeorm_2.Like)(`%${search}%`) },
            ];
        }
        const [vehicles, total] = await this.vehicleRepository.findAndCount(queryOptions);
        return new pagination_response_dto_1.PaginationResponseDto(vehicles, page, limit, total);
    }
    async getCustomerServiceHistory(customerId, queryDto) {
        await this.findOne(customerId);
        const { page = 1, limit = 20, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            where: { customerId },
            relations: ['vehicle', 'assignedMechanic', 'serviceParts', 'invoice'],
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        const [serviceOrders, total] = await this.serviceOrderRepository.findAndCount(queryOptions);
        return new pagination_response_dto_1.PaginationResponseDto(serviceOrders, page, limit, total);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(service_order_entity_1.ServiceOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map