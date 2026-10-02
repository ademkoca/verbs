import verbs from '../../verbsWithTranslation';
import nouns from '../../nouns';
import sentences from '../../sentences';
import dictionary from '../../dictionary';
import { Progress, ProgressName } from '../types/interfaces';

// The `used` entries of each module are the items' `original` strings
export const moduleItems: Record<ProgressName, readonly string[]> = {
  verbs: verbs.map((v) => v.original),
  articles: nouns.map((n) => n.original),
  sentences: sentences.map((s) => s.original),
  dictionary: dictionary.map((d) => d.original),
};

// Share of a module's current items the user has done, 0–100. Ignores duplicates and
// entries for items that were renamed or removed from the data since.
export function completionPercentage(name: ProgressName, used: readonly string[]): number {
  const items = moduleItems[name];
  if (!items?.length) return 0;
  const done = new Set(used);
  const count = new Set(items.filter((item) => done.has(item))).size;
  return Math.min(100, Math.round((count / new Set(items).size) * 100));
}

// Same rule as the API: an item is counted only the first time
export function applyGuess(
  progress: Progress[],
  name: ProgressName,
  item: string,
  correct: boolean
): Progress[] {
  const entry = progress.find((p) => p.name === name);
  if (entry?.used.includes(item)) return progress;
  const updated = {
    name,
    used: [...(entry?.used ?? []), item],
    totalGuesses: (entry?.totalGuesses ?? 0) + 1,
    correctGuesses: (entry?.correctGuesses ?? 0) + (correct ? 1 : 0),
  };
  return entry
    ? progress.map((p) => (p.name === name ? updated : p))
    : [...progress, updated];
}
