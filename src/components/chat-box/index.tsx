import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Avatar, Typography, Button } from '@mui/material';
import { IChat, IMessage } from '../../types/interfaces';
import { IUser } from '../../store/slices/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InputEmoji from 'react-input-emoji';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  setIsTyping,
  showIsTyping,
  users,
  mobile,
  setIsDrawerOpen,
}: {
  chat: IChat;
  currentUser: string;
  setSendMessage: (arg0: any) => void;
  receivedMessage: IMessage | null;
  setIsTyping: (arg0: boolean) => void;
  showIsTyping: boolean;
  users: IUser[];
  mobile?: boolean;
  setIsDrawerOpen?: (arg0: boolean) => void;
}) => {
  dayjs.extend(relativeTime);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id: string) => id !== currentUser);
    const getUserData = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/${userId}`);
        const response = await res.json();
        setUserData(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${apiUrl}/message/${chat._id}`);
        const response = await res.json();
        setMessages(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  //   Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message
  const handleSend = async () => {
    // e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    if (message)
      try {
        const res = await fetch(`${apiUrl}/message`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(message),
        });
        const response = await res.json();
        setMessages([...messages, response]);
        setNewMessage('');
      } catch {
        console.log('error');
      }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  const scroll = useRef();

  return (
    <Container>
      {/* chat header */}
      <Box display={'flex'} alignItems={'center'} gap={3} mt={mobile ? 3 : 0}>
        {mobile && (
          <Button onClick={() => setIsDrawerOpen(true)}>
            <KeyboardArrowLeftIcon />{' '}
          </Button>
        )}
        <Avatar
          alt={userData?.firstName + ' ' + userData?.lastName}
          src={userData?.profilePicture}
          sx={{ width: 75, height: 75 }}
        />
        <Typography variant="h5">{userData?.username}</Typography>
      </Box>
      {/* messages body */}
      <Box
        display={'flex'}
        flexDirection={'column'}
        // justifyContent={'flex-end'}
        mt={2}
        justifyItems={'flex-end'}
        sx={{ height: '60vh', overflowY: 'scroll' }}
      >
        {messages?.map((message) => {
          const isMyMessage = message.senderId === currentUser;
          return (
            <Box
              key={message._id}
              ref={scroll}
              my={1}
              p={2}
              maxWidth={'sm'}
              borderRadius={3}
              bgcolor={isMyMessage ? '#1976d2' : 'lightgrey'}
              color={isMyMessage ? 'white' : 'black'}
              alignSelf={`flex-${isMyMessage ? 'end' : 'start'}`}
            >
              <Typography variant="body1">{message.text}</Typography>{' '}
              <Typography variant="body2">
                {dayjs(message.createdAt).fromNow()}
              </Typography>
            </Box>
          );
        })}
        {showIsTyping && (
          <Typography variant="body2" color="GrayText">
            {
              users.find(
                (u) => u?._id === chat.members.find((m) => m !== currentUser)
              )?.username
            }{' '}
            is typing
          </Typography>
        )}
      </Box>
      {/* message input */}
      <Box display={'flex'}>
        <InputEmoji
          keepOpened
          value={newMessage}
          onChange={handleChange}
          onKeyDown={(e) => {
            e.key === 'Enter' && handleSend();
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
            }, 2000);
          }}
          //   onBlur={() => setIsTyping(false)}
        />
        <Button onClick={handleSend}>Send</Button>
      </Box>
    </Container>
  );
};

export default ChatBox;
