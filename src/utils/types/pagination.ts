export interface IPaginationOptions {
  page: number;
  limit: number;
}

export type PaginationOrderType<T extends Record<string, unknown>> = {
  [P in keyof T]?: 'ASC' | 'DESC';
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
