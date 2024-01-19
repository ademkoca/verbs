import { Container, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { QueryClient, QueryClientProvider } from 'react-query';

const Layout = ({ children }: { children: ReactNode }) => {
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
      primary: {
        main: '#006d77',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
      error: {
        main: '#d90429',
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
