import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Verbs from './pages/verbs/index.tsx';
import Articles from './pages/articles/index.tsx';
import Layout from './components/layout/index.tsx';
import Dictionary from './pages/dictionary/index.tsx';
import SignUp from './pages/auth/sign-up/index.tsx';
import SignIn from './pages/auth/sign-in/index.tsx';
import Sentences from './pages/sentences/index.tsx';
import Progress from './pages/progress/index.tsx';
import Profile from './pages/profile/index.tsx';
import Chat from './pages/chat/index.tsx';
import Home from './pages/home/index.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/verbs',
    element: (
      <Layout>
        <Verbs />
      </Layout>
    ),
    // loader: rootLoader,
    children: [
      // {
      //   path: 'team',
      //   element: <Team />,
      //   // loader: teamLoader,
      // },
    ],
  },
  {
    path: '/sign-up',
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: '/articles',
    element: (
      <Layout>
        <Articles />
      </Layout>
    ),
  },
  {
    path: '/dictionary',
    element: (
      <Layout>
        <Dictionary />
      </Layout>
    ),
  },
  {
    path: '/sentences',
    element: (
      <Layout>
        <Sentences />
      </Layout>
    ),
  },
  {
    path: '/progress',
    element: (
      <Layout>
        <Progress />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '/chat',
    element: (
      <Layout>
        <Chat />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
