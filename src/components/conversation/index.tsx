import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import Typography from '@mui/material/Typography';
import ChatAvatar from '../chat-avatar';
import { IChat, IMessage } from '../../types/interfaces';
import { ApiError, apiFetch } from '../../api/client';

const Conversation = ({
  data,
  currentUser,
  online,
  currentChat,
}: {
  data: IChat;
  currentUser: string | undefined;
  online: boolean;
  currentChat?: IChat | null;
}) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [latestMessage, setLatestMessage] = useState<IMessage | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      const userId = data.members.find((id: string) => id !== currentUser);
      try {
        setUserData(await apiFetch<IUser>(`/users/${userId}`));
      } catch (error) {
        console.log(error);
      }
    };
    // Get the most recent message in a chat
    const getLatestMessage = async () => {
      try {
        const response = await apiFetch<{ data: IMessage[] }>(
          `/message/latest-message/${data._id}`
        );
        setLatestMessage(response.data[0] ?? null);
      } catch (error) {
        console.log(error);
      }
    };
    const checkForUnreadMessages = async () => {
      try {
        await apiFetch(`/chat/checkUnread/${data._id}`);
        setUnreadMessages(true);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          setUnreadMessages(false);
        } else console.log(error);
      }
    };
    getUserData();
    getLatestMessage();
    // the open chat was just marked as read
    if (currentChat?._id === data._id) setUnreadMessages(false);
    else checkForUnreadMessages();
  }, [data, currentUser, currentChat?._id]);

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
