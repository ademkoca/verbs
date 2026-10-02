import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Verbs from './pages/verbs/index.tsx';
import Articles from './pages/articles/index.tsx';
import Layout from './components/layout/index.tsx';
import RequireAuth from './components/require-auth/index.tsx';
import Dictionary from './pages/dictionary/index.tsx';
import SignUp from './pages/auth/sign-up/index.tsx';
import SignIn from './pages/auth/sign-in/index.tsx';
import Sentences from './pages/sentences/index.tsx';
import Progress from './pages/progress/index.tsx';
import Profile from './pages/profile/index.tsx';
import Chat from './pages/chat/index.tsx';
import Home from './pages/home/index.tsx';
import SendFeedback from './pages/send-feedback/index.tsx';
import Unsubscribe from './pages/unsubscribe/index.tsx';

// Bookmarks and emails from before clean URLs use /#/<path>; turn them into /<path>
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'verbs', element: <Verbs /> },
      { path: 'articles', element: <Articles /> },
      { path: 'dictionary', element: <Dictionary /> },
      { path: 'sentences', element: <Sentences /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'send-feedback', element: <SendFeedback /> },
      { path: 'unsubscribe/:id', element: <Unsubscribe /> },
      { path: 'progress', element: <RequireAuth><Progress /></RequireAuth> },
      { path: 'profile', element: <RequireAuth><Profile /></RequireAuth> },
      { path: 'chat', element: <RequireAuth><Chat /></RequireAuth> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
