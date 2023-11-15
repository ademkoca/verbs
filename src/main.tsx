import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/sign-up/index.tsx';
import Verbs from './pages/verbs/index.tsx';
import Articles from './pages/articles/index.tsx';
import Layout from './components/layout/index.tsx';

const router = createBrowserRouter([
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
    // loader: rootLoader,
    children: [
      // {
      //   path: 'team',
      //   element: <Team />,
      //   // loader: teamLoader,
      // },
    ],
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
