import { FuelType } from '../../../common/enums/fuel-type.enum';
export declare class CreateVehicleDto {
    customerId: string;
    make: string;
    model: string;
    year: number;
    color?: string;
    plateNumber: string;
    vinNumber?: string;
    mileage?: number;
    fuelType?: FuelType;
}
