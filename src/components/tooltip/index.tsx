import React from 'react';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Option } from '../../types/interfaces';

const HtmlTooltip = styled(({ className, ...props }: any) => (
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

export default function CustomTooltip({ options }: { options: Option[] }) {
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            {options?.map((option: Option) => (
              <Typography color="inherit" key={option.title}>
                <b>{option.title}</b>: {option.description}
              </Typography>
            ))}
            {/* <Typography color="inherit">
              <b>{'Easy'}</b>: Only past participle
            </Typography>
            <Typography color="inherit">
              {' '}
              <b>{'Hard'}</b>: Preterite and past participle
            </Typography> */}
          </React.Fragment>
        }
      >
        <InfoOutlinedIcon />
      </HtmlTooltip>
    </div>
  );
}
