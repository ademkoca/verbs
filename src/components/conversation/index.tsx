import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import useGermanStore from '../../store';
import Typography from '@mui/material/Typography';
import ChatAvatar from '../chat-avatar';
import { IChat, IMessage } from '../../types/interfaces';
import { ApiError, apiFetch } from '../../api/client';

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
  const store = useGermanStore();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [latestMessage, setLatestMessage] = useState<IMessage | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false);
  // Get the most recent message in a chat
  const getLatestMessage = async (chatId: string) => {
    if (store?.user?._id) {
      try {
        const response = await apiFetch<{ data: IMessage[] }>(
          `/message/latest-message/${chatId}`
        );
        setLatestMessage(response.data[0] ?? null);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const checkForUnreadMessages = async (chatId: string) => {
    if (store?.user?._id) {
      try {
        await apiFetch(`/chat/checkUnread/${chatId}`);
        setUnreadMessages(true);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          setUnreadMessages(false);
        } else console.log(error);
      }
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      const userId = data.members.find((id: string) => id !== currentUser);
      try {
        setUserData(await apiFetch<IUser>(`/users/${userId}`));
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
    getLatestMessage(data._id);
    // the open chat was just marked as read
    if (currentChat?._id === data._id) setUnreadMessages(false);
    else checkForUnreadMessages(data._id);
  }, [data, currentChat?._id]);

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
