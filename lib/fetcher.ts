export class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'FetchError'
  }
}

export async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    const error = new FetchError(
      res.status,
      `Failed to fetch data: ${res.status} ${res.statusText}`
    )
    throw error
  }
  return res.json() as Promise<T>
}
