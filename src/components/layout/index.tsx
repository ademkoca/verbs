import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }: { children: ReactNode }) => {
  const defaultTheme = createTheme();
  return (
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
  );
};

export default Layout;
