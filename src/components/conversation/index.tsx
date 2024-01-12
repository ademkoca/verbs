import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import useGermanStore from '../../store';
import Typography from '@mui/material/Typography';
import ChatAvatar from '../chat-avatar';
import { IChat, IMessage } from '../../types/interfaces';
import { auth } from '../../utils/firebase';

const Conversation = ({
  data,
  currentUser,
  online,
  currentChat,
}: // preview,
{
  data: any;
  currentUser: string | undefined;
  online: boolean;
  currentChat?: IChat | null;
  // preview?: IMessage;
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [latestMessage, setLatestMessage] = useState<IMessage | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false);
  // Get the most recent message in a chat
  const getLatestMessage = async (chatId: string) => {
    if (store?.user?._id) {
      try {
        const res = await fetch(`${apiUrl}/message/latest-message/${chatId}`);
        const response = await res.json();
        setLatestMessage(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const checkForUnreadMessages = async (chatId: string) => {
    if (store?.user?._id) {
      try {
        const res = await fetch(`${apiUrl}/chat/checkUnread/${chatId}`);
        if (res.status === 200) setUnreadMessages(true);
        else setUnreadMessages(false);
        // setLatestMessage(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      const userId = data.members.find((id: string) => id !== currentUser);
      const token = await auth.currentUser?.getIdToken(true);
      const jwt = token ? token : store.token;
      try {
        const res = await fetch(`${apiUrl}/users/${userId}`, {
          headers: { Authorization: 'Bearer ' + jwt },
        });
        const response = await res.json();
        setUserData(response);
        // store.updateUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
    getLatestMessage(data._id);
    if (currentChat?._id !== data._id) checkForUnreadMessages(data._id);
  }, [data]);

  return (
    <Box display={'flex'} alignItems={'center'} gap={2} py={2}>
      <ChatAvatar user={userData} online={online} />
      <Box>
        <Typography
          variant="h6"
          fontWeight={
            unreadMessages && latestMessage?.senderId !== currentUser
              ? 'bold'
              : 'normal'
          }
        >
          {userData?.username}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={
            unreadMessages && latestMessage?.senderId !== currentUser
              ? 'bold'
              : 'normal'
          }
        >
          {latestMessage?.text && latestMessage?.text?.length > 25
            ? latestMessage.text.substring(0, 25) + '...'
            : latestMessage?.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Conversation;
