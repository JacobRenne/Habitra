import { getAccessToken } from "@/app/hooks/getAccessToken";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const token = await getAccessToken();
  const headers = new Headers(init?.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });
  return res;
}
