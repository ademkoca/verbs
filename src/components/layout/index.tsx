import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { ReactNode } from 'react';
import Navbar from './navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="header" maxWidth="xl" sx={{ marginTop: 10 }}>
        <Navbar />
      </Container>
      {children}
    </ThemeProvider>
  );
};

export default Layout;
