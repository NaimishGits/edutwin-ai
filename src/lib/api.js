const API_URL = "http://127.0.0.1:8000"

export async function api(path, options = {}) {
  const token = localStorage.getItem("accessToken")

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong")
  }

  return data
}

export function logout() {
  localStorage.removeItem("accessToken")
}