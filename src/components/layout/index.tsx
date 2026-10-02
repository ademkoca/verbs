import { useMemo } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import Footer from './footer';
import AuthSync from '../auth-sync';
import useGermanStore from '../../store';

const queryClient = new QueryClient();

const buildTheme = (darkMode: boolean) =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
          },
        },
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#006d77',
      },
      secondary: {
        main: '#F1F1F1',
        light: '#F5EBFF',
        contrastText: '#47008F',
      },
      error: {
        main: '#f95738',
      },
      home: { main: '#090909' },
      verbs: { main: '#006D77' },
      articles: { main: '#DB7006' },
      sentences: { main: '#9A5B5E' },
      dictionary: { main: '#022550' },
    },
  });

const Layout = () => {
  const darkMode = useGermanStore((s) => s.darkMode);
  const theme = useMemo(() => buildTheme(darkMode), [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthSync />
        <Container component="header" maxWidth="xl" sx={{ paddingX: 0 }}>
          <Navbar />
        </Container>
        <Outlet />
        <Container component="footer" maxWidth="xl" sx={{ marginBottom: 2, marginTop: 5 }}>
          <Footer />
        </Container>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
