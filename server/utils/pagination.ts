export interface Pagination {
    total: number;
    page: number;
    pages: number;
    pageSize: number;
}

export interface PaginatedResult<R> {
    result: R,
    pagination: Pagination
}

export const paginatedResult = <R>(result: R, total: number, page: number, pageSize: number): PaginatedResult<R> => ({
    result,
    pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
        pageSize,
    },
});