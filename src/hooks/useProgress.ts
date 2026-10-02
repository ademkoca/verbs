import { useCallback } from 'react';
import { toast } from 'react-toastify';
import useGermanStore from '../store';
import { User } from '../store/slices/auth';
import { apiFetch } from '../api/client';
import { applyGuess } from '../utils/progress';
import { ProgressName } from '../types/interfaces';

// Saved progress of one module for the signed-in user (undefined for guests)
export function useProgress(name: ProgressName) {
  const progress = useGermanStore((s) => s.user?.progress?.find((p) => p.name === name));
  const isSignedIn = useGermanStore((s) => !!s.user);

  // Records one guess: shown right away, then replaced by the server's copy
  const record = useCallback(
    async (item: string, correct: boolean) => {
      const { user, updateUser } = useGermanStore.getState();
      if (!user) return;
      updateUser({ ...user, progress: applyGuess(user.progress ?? [], name, item, correct) });
      try {
        const res = await apiFetch<{ data: User }>(`/users/${user._id}/progress`, {
          method: 'POST',
          body: JSON.stringify({ name, item, correct }),
        });
        useGermanStore.getState().updateUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Your progress could not be saved. Please check your connection.');
      }
    },
    [name]
  );

  return { progress, isSignedIn, record };
}
