import { type ClientPerspective } from '@sanity/client'
import {
  useQuery as brokenUseQuery,
  type ContentSourceMap,
  type NonUndefinedGuard,
  type QueryParams,
  type QueryStoreState,
  type UseQueryOptionsUndefinedInitial,
  type WithEncodeDataAttribute,
} from '@sanity/react-loader'

type QueryResponseInitial<QueryResponseResult> = {
  data: QueryResponseResult
  sourceMap?: ContentSourceMap | undefined
  /**
   * The perspective used to fetch the data, if not provided it'll assume 'published'
   */
  perspective?: ClientPerspective
}

type UseQueryOptionsDefinedInitial<QueryResponseResult = unknown> = {
  initial: NonUndefinedGuard<QueryResponseInitial<QueryResponseResult>>
}

type FixedUseQuery = (<
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams | undefined,
  options?: UseQueryOptionsUndefinedInitial | undefined,
) => QueryStoreState<QueryResponseResult, QueryResponseError> &
  WithEncodeDataAttribute) &
  (<QueryResponseResult_1 = unknown, QueryResponseError_1 = unknown>(
    query: string,
    params?: QueryParams | undefined,
    options?: UseQueryOptionsDefinedInitial<QueryResponseResult_1> | undefined,
  ) => Omit<
    QueryStoreState<QueryResponseResult_1, QueryResponseError_1>,
    'data'
  > & {
    data: QueryResponseResult_1
  } & WithEncodeDataAttribute)

export const useQuery = brokenUseQuery as FixedUseQuery
