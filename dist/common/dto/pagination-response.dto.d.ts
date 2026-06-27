export declare class PaginationMetaDto {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
export declare class PaginationResponseDto<T> {
    data: T[];
    meta: PaginationMetaDto;
    constructor(data: T[], page: number, limit: number, total: number);
}
