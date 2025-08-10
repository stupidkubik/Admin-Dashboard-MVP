import useSWR, { SWRConfiguration } from 'swr'
import { fetcher, FetchError } from '../fetcher'

export type ApiEndpoint = '/api/stats' | '/api/users' | (string & {})

export type FetchState<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: FetchError | undefined
  isEmpty: boolean
  isValidating: boolean
  mutate: () => void
}

export function useData<T>(
  url: ApiEndpoint | null,
  config?: SWRConfiguration
): FetchState<T> {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    ...config,
  })

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    isEmpty: !isLoading && !error && !data,
    isValidating,
    mutate
  }
}
