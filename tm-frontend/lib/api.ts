import { ApiErrorResponse } from "@/app/types/api";

export async function apiFetch<T>(apiUrl: string, option?: RequestInit) {
  const response = await fetch(apiUrl, option);

  if (!response.ok) {
    const error = (await response.json()) as ApiErrorResponse;
    throw new Error(error.message);
  }

  const data = (await response.json()) as T;
  return data;
}
