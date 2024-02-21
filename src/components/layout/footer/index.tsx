import { Link, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {`${t('copyright')} © `}
      <Link color="primary" href="https://ademkoca.netlify.app" target="_blank">
        Adem Koca
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;
