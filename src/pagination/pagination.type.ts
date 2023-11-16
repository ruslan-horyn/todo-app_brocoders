import { FilterEntityKeys } from './../utils/types/filter-entity-keys';
import { PaginationOrderType } from './../utils/types/pagination';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export type PaginationArgs<T extends ObjectLiteral> = {
  repository: Repository<T>;
  where?: FindManyOptions<T>['where'];
  page?: number;
  limit?: number;
  order?: PaginationOrderType<FilterEntityKeys<T>>;
};
