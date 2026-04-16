function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function isTokenValid(token) {
  if (!token) {
    return false;
  }

  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return false;
    }

    const data = JSON.parse(decodeBase64Url(payload));
    if (!data.exp) {
      return true;
    }

    return data.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function clearAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function getValidAccessToken() {
  const token = localStorage.getItem("access_token");
  if (!isTokenValid(token)) {
    clearAuthTokens();
    return null;
  }

  return token;
}
