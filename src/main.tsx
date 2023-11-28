import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Verbs from './pages/verbs/index.tsx';
import Articles from './pages/articles/index.tsx';
import Layout from './components/layout/index.tsx';
import Dictionary from './pages/dictionary/index.tsx';
import Sentences2 from './pages/sentences2/index.tsx';

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
  {
    path: '/sentences',
    element: (
      <Layout>
        <Sentences2 />
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
