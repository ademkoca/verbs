import { auth } from '../utils/firebase';

const apiUrl = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Waits for Firebase to restore the session, then returns a current ID token
// (refreshed automatically by the SDK when it is about to expire)
export async function getAuthToken(): Promise<string> {
  await auth.authStateReady();
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new ApiError(401, 'Not signed in');
  return token;
}

// Calls the API with the signed-in user's token; throws ApiError on non-2xx responses
export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  const res = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  if (!res.ok) throw new ApiError(res.status, text || res.statusText);
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}
