# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The Glasklar web app: React 18 + Vite + MUI + zustand, TypeScript. It talks to `glasklar-api` (REST) and `glasklar-chat-api` (socket.io), which are separate repos. Pushing to `master` deploys to Netlify.

## Commands

Use Yarn 1 (`npx yarn@1.22.22 …`); the global `yarn` is v4 and would rewrite `yarn.lock`.

```bash
npx yarn@1.22.22 install --frozen-lockfile
npx yarn@1.22.22 dev                         # Vite dev server on :5173
npx yarn@1.22.22 build                       # tsc && vite build (type errors fail the build)
npx yarn@1.22.22 lint                        # eslint, --max-warnings 0
npx yarn@1.22.22 test                        # vitest run
npx vitest run src/utils/answer.test.ts      # one test file
npx vitest run -t "matchSentence"            # tests by name
```

`.env` (`VITE_API_URL`, `VITE_SOCKET_URL`, `VITE_FIREBASE_*`) points at the **production** Firebase project. Signing up or saving progress locally writes real data unless `VITE_API_URL` points at an API running on an in-memory database.

## Architecture

**Routing** (`src/main.tsx`). `createBrowserRouter` with one layout route (`components/layout`, which renders `<Outlet/>`). `RequireAuth` guards `/progress`, `/profile` and `/chat`. Old hash URLs (`/#/verbs`) are rewritten to paths before the router starts. Netlify serves `index.html` for every path (`netlify.toml`). Keep `.ts` files out of the project root: the Vite dev server would answer a route like `/sentences` with a root-level `sentences.ts`. That's why the data lives in `src/data/`.

**Session and API calls.**
- `src/api/client.ts` `apiFetch()` waits for `auth.authStateReady()`, attaches a fresh Firebase ID token, and throws `ApiError(status, text)` on non-2xx responses. Pass `{ auth: 'optional' | 'none' }` for guest-capable endpoints.
- The zustand store (`src/store`, persisted as `german-storage`) caches only `user` and `darkMode`. There's no token in the store.
- `components/auth-sync` signs the user out when the Firebase session ends, and refreshes `user` from `GET /auth/signin` once per page load. The cached copy can be stale; the server is the source of truth.
- Subscribe to the store with selectors (`useGermanStore((s) => s.user)`).

**Quiz modules** (`pages/{verbs,articles,sentences,dictionary}`) share three pieces:
- **`hooks/useQuiz`** builds a finite queue (`utils/itemQueue`, `repeat: false`) of the module's items minus the user's stored `used` entries, captured at mount. It hands out each remaining item once; `current === null` means completed, and guests get `restart()`. `answer()` accepts at most one answer per item (a ref guard against double submits), and `schedule()` advances after a 3-second feedback delay; its timer is cleared on unmount.
- **`hooks/useProgress(name)`** updates the stored user optimistically with `utils/progress.applyGuess` (same rule as the API: an item counts once), then replaces it with the server response from `POST /users/:id/progress`. Signed-in pages show stored totals; guests see session totals.
- **`components/quiz-layout`** renders the shared header, score, feedback and "completed" screen. Pages supply the prompt, an optional `board` and their controls.

**Answer checking** (`utils/answer.ts`).
- `isCorrect` trims, lowercases and folds `ß→ss`, `ä→ae`, `ö→oe`, `ü→ue`, so ASCII spellings count as correct.
- Sentences are built from word tiles tracked by position (repeated words are allowed). `matchSentence` accepts `original` or any `alternatives`, ignoring capitalisation, because moving a phrase to the front changes which word is capitalised.

**Data** (`src/data/*.ts`). Typed arrays. Each item's `original` is its identity: the queue key, and the string stored in users' progress. `src/data.test.ts` enforces the invariants:
- no duplicate items
- each dictionary word has exactly one correct option
- articles agree between `nouns.ts` and `dictionary.ts`
- sentence alternatives use exactly the same tiles. Punctuation is part of a tile, so an alternative can't move a comma or the full stop to another word.

**Theme.** Each module has a palette color (`home`, `verbs`, `articles`, `sentences`, `dictionary`) defined in `components/layout` and declared in `src/types/mui.d.ts`, so they can be used as `<Button color="verbs">`. In `sx`, use `` `${name}.main` ``.

**Chat** (`pages/chat`, `components/chat-box`, `components/conversation`). One socket per signed-in user, created in a single effect that also registers the listeners and disconnects on unmount. The `auth` callback fetches a fresh socket token on every (re)connect. A sent message is saved with `POST /message` first, then emitted with `receiverId`.
