import {
  FindManyOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { BASE_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../common/constants';

export type PaginationOrderType<T extends Record<string, unknown>> = {
  [P in keyof T as T[P] extends Record<string, unknown> ? never : P]?: {
    order: 'ASC' | 'DESC';
    nulls?: 'NULLS FIRST' | 'NULLS LAST';
  };
};

export class PaginationService {
  private setOrder<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    order: PaginationOrderType<T>,
  ) {
    for (const orderKey in order) {
      queryBuilder.addOrderBy(
        orderKey,
        order[orderKey]?.order,
        order[orderKey]?.nulls,
      );
    }
  }

  async getPagination<T extends ObjectLiteral>({
    repository,
    where = {},
    page = DEFAULT_PAGE,
    limit = BASE_LIMIT,
    order = {} as PaginationOrderType<T>,
  }: {
    repository: Repository<T>;
    where?: FindManyOptions<T>['where'];
    page?: number;
    limit?: number;
    order?: PaginationOrderType<T>;
  }) {
    const offset = (page - 1) * limit;
    const take = limit > MAX_LIMIT ? MAX_LIMIT : limit;

    const queryBuilder = repository
      .createQueryBuilder()
      .where(where)
      .skip(offset)
      .take(take)
      .orderBy();

    this.setOrder(queryBuilder, order);

    const [items, count] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      items,
      count,
      totalPages,
      nextPage,
      prevPage,
    };
  }
}
