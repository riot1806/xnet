import { rootApi } from './rootApi';

import { Product } from '@/types';

export const productApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => '/products',
    }),
  }),
});

export const {
  useGetProductsQuery,
  util: { getRunningQueriesThunk },
} = productApi;

export const { getProducts } = productApi.endpoints;
