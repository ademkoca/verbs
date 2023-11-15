import React from 'react';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function CustomTooltip() {
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">
              <b>{'Easy'}</b>: Only past participle
            </Typography>
            <Typography color="inherit">
              {' '}
              <b>{'Hard'}</b>: Preterite and past participle
            </Typography>
          </React.Fragment>
        }
      >
        <InfoOutlinedIcon />
      </HtmlTooltip>
    </div>
  );
}
