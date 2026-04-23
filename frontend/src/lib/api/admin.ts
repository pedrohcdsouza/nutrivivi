import { fetchWithAuth, API_URL } from "../auth";

export async function getAnamneses(search?: string) {
  let url = `${API_URL}/admin/anamneses/`;
  if (search) {
    url += `?search=${encodeURIComponent(search)}`;
  }

  const response = await fetchWithAuth(url, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado. Faça login novamente.");
    }
    throw new Error("Erro ao buscar a lista de anamneses");
  }

  return response.json();
}

export async function getAnamneseById(id: string) {
  const response = await fetchWithAuth(`${API_URL}/admin/anamneses/${id}/`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado. Faça login novamente.");
    }
    throw new Error("Erro ao buscar os detalhes da anamnese");
  }

  return response.json();
}
