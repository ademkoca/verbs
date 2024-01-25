import { Link, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="primary" href="https://ademkoca.netlify.app" target="_blank">
        Adem Koca
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
