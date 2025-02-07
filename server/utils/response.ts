export const createPaginatedResponse = <T>(data: T, total: number, page: number, limit: number) => ({
  data,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});
