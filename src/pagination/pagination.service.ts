import { FilterEntityKeys } from 'src/utils/types/filter-entity-keys';
import { PaginationOrderType } from 'src/utils/types/pagination';
import { ObjectLiteral } from 'typeorm';
import { BASE_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../common/constants';
import { PaginationArgs } from './pagination.type';

export class PaginationService {
  private gerEntityOrder<T extends ObjectLiteral>(
    order: PaginationOrderType<FilterEntityKeys<T>>,
  ) {
    const entityOrder = {} as Record<string, 'ASC' | 'DESC'>;
    for (const name in order) {
      const value = order[name];
      if (value) {
        entityOrder[name] = value;
      }
    }
    return entityOrder;
  }

  async getPagination<T extends ObjectLiteral>({
    repository,
    where = {},
    page = DEFAULT_PAGE,
    limit = BASE_LIMIT,
    order = {} as PaginationOrderType<FilterEntityKeys<T>>,
  }: PaginationArgs<T>) {
    const offset = (page - 1) * limit;
    const take = limit > MAX_LIMIT ? MAX_LIMIT : limit;
    const orderBy = this.gerEntityOrder(order);

    const queryBuilder = repository
      .createQueryBuilder()
      .where(where)
      .skip(offset)
      .take(take)
      .orderBy(orderBy);

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
