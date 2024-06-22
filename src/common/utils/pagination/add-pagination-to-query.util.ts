import { PAGINATION_LIMIT } from '../../constants/orm';
import { IPagination } from '../../types/pagination';
import { SelectQueryBuilder } from 'typeorm';

const getSkipByPage = (page = 1, limit: number = PAGINATION_LIMIT) =>
  page === 1 ? 0 : (page - 1) * limit;

export const addPaginationToQuery = <T>(
  query: SelectQueryBuilder<T>,
  pagination?: Partial<IPagination>,
): SelectQueryBuilder<T> => {
  if (pagination?.limit) {
    query.take(pagination.limit);
  }

  if (pagination?.page) {
    query.skip(
      getSkipByPage(pagination.page, pagination?.limit || PAGINATION_LIMIT),
    );
  }

  return query;
};
