import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import useGermanStore from '../../store';
import Typography from '@mui/material/Typography';
import ChatAvatar from '../chat-avatar';

const Conversation = ({
  data,
  currentUser,
  online,
}: {
  data: any;
  currentUser: string | undefined;
  online: boolean;
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const [userData, setUserData] = useState<IUser | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      const userId = data.members.find((id: string) => id !== currentUser);
      try {
        const res = await fetch(`${apiUrl}/users/${userId}`);
        const response = await res.json();
        setUserData(response);
        // store.updateUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <Box display={'flex'} alignItems={'center'} gap={2} py={2}>
      <ChatAvatar user={userData} online={online} />
      <Typography variant="h6">{userData?.username}</Typography>
    </Box>
  );
};

export default Conversation;
