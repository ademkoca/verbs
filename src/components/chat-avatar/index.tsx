import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IUser } from '../../store/slices/auth';
import { getInitials } from '../../utils/helpers';
import { Typography } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function ChatAvatar({
  user,
  online,
}: {
  user: IUser;
  online: boolean;
}) {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant={online ? 'dot' : 'standard'}
      >
        {user?.profilePicture !== '' ? (
          <Avatar
            // sx={{ width: mobile ? 50 : 75, height: mobile ? 50 : 75 }}
            alt={user?.firstName + ' ' + user?.lastName}
            src={user?.profilePicture}
          />
        ) : (
          <Avatar
            // sx={{ width: mobile ? 50 : 75, height: mobile ? 50 : 75 }}
            alt={user?.firstName + ' ' + user?.lastName}
            src={user?.profilePicture}
          >
            <Typography variant="body1">
              {getInitials(user?.firstName, user?.lastName)}
            </Typography>
          </Avatar>
        )}
      </StyledBadge>
    </Stack>
  );
}
