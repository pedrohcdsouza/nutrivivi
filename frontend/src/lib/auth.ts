import Cookies from "js-cookie";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }), // SimpleJWT usually uses 'username' even if it's an email
  });

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos");
  }

  const data = await response.json();
  
  Cookies.set("access_token", data.access, { expires: 1 }); // Expires in 1 day
  if (data.refresh) {
    Cookies.set("refresh_token", data.refresh, { expires: 7 }); // Expires in 7 days
  }

  return data;
}

export function logout() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/login";
}

export function getToken() {
  return Cookies.get("access_token");
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  } as Record<string, string>;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  // Handle token expiration
  if (response.status === 401 && typeof window !== "undefined") {
    const refreshToken = Cookies.get("refresh_token");
    if (refreshToken) {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        Cookies.set("access_token", refreshData.access, { expires: 1 });
        headers["Authorization"] = `Bearer ${refreshData.access}`;
        response = await fetch(url, { ...options, headers });
      } else {
        logout();
      }
    } else {
      logout();
    }
  }

  return response;
}
