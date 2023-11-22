import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';
import Verbs from './pages/verbs/index.tsx';
import Articles from './pages/articles/index.tsx';
import Layout from './components/layout/index.tsx';
import Dictionary from './pages/dictionary/index.tsx';

const router = createHashRouter([
  {
    path: '/',
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
