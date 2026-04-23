export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function submitAnamnese(data: any) {
  const response = await fetch(`${API_URL}/public/anamneses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Ocorreu um erro ao enviar sua anamnese. Tente novamente.");
  }

  return response.json();
}
