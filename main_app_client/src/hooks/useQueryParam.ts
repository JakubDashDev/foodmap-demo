import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export function useQueryParam<T extends string>(key: string, defaultValue: T) {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = (searchParams.get(key) as T | null) ?? defaultValue

  const setValue = useCallback(
    (next: T) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          if (next === defaultValue) {
            params.delete(key)
          } else {
            params.set(key, next)
          }
          return params
        },
        { replace: true },
      )
    },
    [key, defaultValue, setSearchParams],
  )

  return [value, setValue] as const
}
