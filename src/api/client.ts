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
  const token = await getOptionalAuthToken();
  if (!token) throw new ApiError(401, 'Not signed in');
  return token;
}

export async function getOptionalAuthToken(): Promise<string | undefined> {
  await auth.authStateReady();
  return auth.currentUser?.getIdToken();
}

type AuthMode = 'required' | 'optional' | 'none';

// Calls the API; throws ApiError on non-2xx responses.
// auth: 'required' (default) needs a signed-in user, 'optional' sends a token when there is one.
export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
  { auth: mode = 'required' }: { auth?: AuthMode } = {}
): Promise<T> {
  const token =
    mode === 'required'
      ? await getAuthToken()
      : mode === 'optional'
        ? await getOptionalAuthToken()
        : undefined;
  const res = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
