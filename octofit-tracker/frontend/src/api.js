import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// Only accept a plain Codespace name so the env value cannot redirect requests to another host.
export const API_BASE_URL =
  codespaceName && /^[a-z0-9-]+$/i.test(codespaceName)
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

export const apiUrl = (path) => `${API_BASE_URL}${path}`

// Accept both plain arrays and paginated `{ results: [...] }` payloads.
export function toList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export function useApiList(request) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    request(controller.signal)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((payload) => setState({ items: toList(payload), loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], loading: false, error: error.message })
        }
      })

    return () => controller.abort()
  }, [request])

  return state
}
