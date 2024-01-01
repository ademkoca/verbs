import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import useGermanStore from '../../store';
import Typography from '@mui/material/Typography';
import ChatAvatar from '../chat-avatar';
import { IMessage } from '../../types/interfaces';

const Conversation = ({
  data,
  currentUser,
  online,
}: // preview,
{
  data: any;
  currentUser: string | undefined;
  online: boolean;
  // preview?: IMessage;
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [latestMessage, setLatestMessage] = useState<IMessage | null>(null);
  console.log(data);
  // Get the most recent message in a chat
  const getLatestMessage = async (chatId: string) => {
    if (store?.user?._id) {
      try {
        const res = await fetch(`${apiUrl}/message/latest-message/${chatId}`);
        const response = await res.json();
        console.log(response.data[0]);
        setLatestMessage(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
    getLatestMessage(data._id);
  }, []);

  return (
    <Box display={'flex'} alignItems={'center'} gap={2} py={2}>
      <ChatAvatar user={userData} online={online} />
      <Box>
        <Typography variant="h6">{userData?.username}</Typography>
        <Typography variant="body2">{latestMessage?.text ?? ''}</Typography>
      </Box>
    </Box>
  );
};

export default Conversation;
