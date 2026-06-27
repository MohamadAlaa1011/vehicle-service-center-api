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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const service_order_entity_1 = require("../service-orders/entities/service-order.entity");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let VehiclesService = class VehiclesService {
    vehicleRepository;
    customerRepository;
    serviceOrderRepository;
    constructor(vehicleRepository, customerRepository, serviceOrderRepository) {
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
        this.serviceOrderRepository = serviceOrderRepository;
    }
    async create(createVehicleDto) {
        const { customerId, plateNumber, vinNumber, ...vehicleData } = createVehicleDto;
        const customer = await this.customerRepository.findOne({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        const existingVehicleByPlate = await this.vehicleRepository.findOne({
            where: { plateNumber },
        });
        if (existingVehicleByPlate) {
            throw new common_1.ConflictException('Vehicle with this plate number already exists');
        }
        if (vinNumber) {
            const existingVehicleByVin = await this.vehicleRepository.findOne({
                where: { vinNumber },
            });
            if (existingVehicleByVin) {
                throw new common_1.ConflictException('Vehicle with this VIN already exists');
            }
        }
        const vehicle = this.vehicleRepository.create({
            ...vehicleData,
            customerId,
            plateNumber,
            vinNumber,
        });
        return this.vehicleRepository.save(vehicle);
    }
    async findAll(queryDto) {
        const { page = 1, limit = 20, search, customerId, make, year, fuelType, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            relations: ['customer'],
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        const whereConditions = {};
        if (customerId) {
            whereConditions.customerId = customerId;
        }
        if (make) {
            whereConditions.make = make;
        }
        if (year) {
            whereConditions.year = year;
        }
        if (fuelType) {
            whereConditions.fuelType = fuelType;
        }
        if (search) {
            const searchConditions = [
                { ...whereConditions, make: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, model: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, plateNumber: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, vinNumber: (0, typeorm_2.Like)(`%${search}%`) },
                { ...whereConditions, color: (0, typeorm_2.Like)(`%${search}%`) },
            ];
            queryOptions.where = searchConditions;
        }
        else {
            queryOptions.where = whereConditions;
        }
        const [vehicles, total] = await this.vehicleRepository.findAndCount(queryOptions);
        return new pagination_response_dto_1.PaginationResponseDto(vehicles, page, limit, total);
    }
    async findOne(id) {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: ['customer', 'appointments', 'serviceOrders'],
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${id} not found`);
        }
        return vehicle;
    }
    async update(id, updateVehicleDto) {
        const vehicle = await this.findOne(id);
        const { plateNumber, vinNumber, ...updateData } = updateVehicleDto;
        if (plateNumber && plateNumber !== vehicle.plateNumber) {
            const existingVehicle = await this.vehicleRepository.findOne({
                where: { plateNumber },
            });
            if (existingVehicle) {
                throw new common_1.ConflictException('Vehicle with this plate number already exists');
            }
        }
        if (vinNumber && vinNumber !== vehicle.vinNumber) {
            const existingVehicle = await this.vehicleRepository.findOne({
                where: { vinNumber },
            });
            if (existingVehicle) {
                throw new common_1.ConflictException('Vehicle with this VIN already exists');
            }
        }
        await this.vehicleRepository.update(id, {
            ...updateData,
            ...(plateNumber && { plateNumber }),
            ...(vinNumber && { vinNumber }),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const vehicle = await this.findOne(id);
        await this.vehicleRepository.softDelete(id);
    }
    async getVehicleServiceHistory(vehicleId, queryDto) {
        await this.findOne(vehicleId);
        const { page = 1, limit = 20, sortBy = 'createdAt', order = 'DESC', } = queryDto;
        const queryOptions = {
            where: { vehicleId },
            relations: ['customer', 'assignedMechanic', 'serviceParts', 'invoice'],
            skip: (page - 1) * limit,
            take: limit,
            order: { [sortBy]: order },
        };
        const [serviceOrders, total] = await this.serviceOrderRepository.findAndCount(queryOptions);
        return new pagination_response_dto_1.PaginationResponseDto(serviceOrders, page, limit, total);
    }
    async updateMileage(vehicleId, newMileage) {
        const vehicle = await this.findOne(vehicleId);
        if (newMileage < 0) {
            throw new common_1.BadRequestException('Mileage cannot be negative');
        }
        if (vehicle.mileage && newMileage < vehicle.mileage) {
            throw new common_1.BadRequestException('New mileage cannot be less than current mileage');
        }
        await this.vehicleRepository.update(vehicleId, { mileage: newMileage });
        return this.findOne(vehicleId);
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(service_order_entity_1.ServiceOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map