declare class ServicePartDto {
    partId: string;
    quantity: number;
    unitPrice?: number;
}
export declare class AddPartsDto {
    parts: ServicePartDto[];
}
export {};
