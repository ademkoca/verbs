import { Container, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import useGermanStore from '../../store';

const Layout = ({ children }: { children: ReactNode }) => {
  const store = useGermanStore();
  const [darkMode, setDarkMode] = useState<boolean>(store.darkMode);

  useEffect(() => {
    setDarkMode(store.darkMode);
  }, [store.darkMode]);
  const defaultTheme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
          },
        },
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#006d77',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#F1F1F1',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
      error: {
        // main: '#d90429',
        main: '#f95738',
      },
    },
  });
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="header" maxWidth="xl" sx={{ paddingX: 0 }}>
          <Navbar />
        </Container>
        {children}
        <Container
          component="footer"
          maxWidth="xl"
          sx={{ marginBottom: 2, marginTop: 5 }}
        >
          <Footer />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
