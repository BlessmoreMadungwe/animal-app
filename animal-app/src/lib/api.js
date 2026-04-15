const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";
const rawApiBaseUrl = (import.meta.env.VITE_API_URL || "").trim();

function resolveApiBaseUrl() {
  if (!rawApiBaseUrl) {
    return DEFAULT_API_BASE_URL;
  }

  // Ignore placeholder tutorial values so local development still works.
  if (
    rawApiBaseUrl.includes("your-django-backend-url") ||
    rawApiBaseUrl.includes("example.com")
  ) {
    return DEFAULT_API_BASE_URL;
  }

  return rawApiBaseUrl.replace(/\/$/, "");
}

export const API_BASE_URL = resolveApiBaseUrl();

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
