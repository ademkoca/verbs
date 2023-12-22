import { Container, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { QueryClient, QueryClientProvider } from 'react-query';

const Layout = ({ children }: { children: ReactNode }) => {
  const defaultTheme = createTheme();
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
