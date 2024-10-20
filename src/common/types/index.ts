export interface Filter {
  filter: string;
  operator: '=' | 'in' | 'gte' | 'lt' | 'gt' | 'lte' | 'search';
  value?: string | number | Array<string | number>;
  field: string;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationOptions {
  name?: string;
  limit: number;
  page: number;
  sort: {
    by: string;
    order: SortOrder;
  };
  filters: Filter[];
}
