// Shared result type for all server actions
export type ActionResult<T = undefined> = {
  success: boolean;
  error?: string;
  data?: T;
};

// Pagination
export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
