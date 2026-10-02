import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import useGermanStore from '../../store';
import { User } from '../../store/slices/auth';
import { ApiError, apiFetch } from '../../api/client';

const apiUrl = import.meta.env.VITE_API_URL;

// Keeps the cached user in line with the Firebase session and the server
const AuthSync = () => {
  useEffect(() => {
    // wake up the API (Render's free tier sleeps when idle)
    fetch(`${apiUrl}/ping`).catch(() => {});

    let refreshed = false;
    return onAuthStateChanged(auth, async (firebaseUser) => {
      const { user, logout, updateUser } = useGermanStore.getState();
      if (!firebaseUser) {
        // the session ended (signed out elsewhere, password changed, account removed)
        if (user) logout();
        return;
      }
      if (!user || refreshed) return;
      refreshed = true;
      try {
        // the cached copy may be older than progress saved on another device
        const res = await apiFetch<{ data: User }>('/auth/signin');
        updateUser(res.data);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 404)) {
          logout();
        }
      }
    });
  }, []);

  return null;
};

export default AuthSync;
