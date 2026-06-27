import { CreateVehicleDto } from './create-vehicle.dto';
declare const UpdateVehicleDto_base: import("@nestjs/common").Type<Partial<Omit<CreateVehicleDto, "customerId">>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
