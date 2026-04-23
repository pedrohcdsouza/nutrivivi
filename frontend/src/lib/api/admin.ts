export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function getAnamneses(search?: string) {
  let url = `${API_URL}/admin/anamneses/`;
  if (search) {
    url += `?search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store", // For now, we will use simple client-side fetch, but this is a good place to configure caching behavior in Next.js
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar a lista de anamneses");
  }

  return response.json();
}

export async function getAnamneseById(id: string) {
  const response = await fetch(`${API_URL}/admin/anamneses/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar os detalhes da anamnese");
  }

  return response.json();
}
