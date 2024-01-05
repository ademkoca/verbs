import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
} from '@mui/material';
import { IChat, IMessage } from '../../types/interfaces';
import { IUser } from '../../store/slices/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InputEmoji from 'react-input-emoji';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const [chatMenu, setChatMenu] = useState<null | HTMLElement>(null);
  interface IChatOptions {
    label: string;
    handler?: (arg0: string) => void | null;
  }

  const chatOptions: IChatOptions[] = [
    { label: 'Delete', handler: (id: string) => handleDeleteChat(id) },
  ];
  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };
  const handleOpenChatMenu = (event: MouseEvent<HTMLElement>) => {
    setChatMenu(event.currentTarget);
  };
  const handleCloseChatMenu = () => {
    setChatMenu(null);
  };
  //delete chat
  const handleDeleteChat = async (id: string) => {
    try {
      const res = await fetch(
        `${apiUrl}/message/${id}`,

        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        alert('Chat deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
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
    if (newMessage !== '') {
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
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          {mobile && (
            <Button
              onClick={() => setIsDrawerOpen(true)}
              sx={{ marginTop: 3, marginX: 0 }}
            >
              <KeyboardArrowLeftIcon />{' '}
            </Button>
          )}
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={mobile ? 2 : 3}
            mt={mobile ? 3 : 0}
          >
            <Avatar
              alt={userData?.firstName + ' ' + userData?.lastName}
              src={userData?.profilePicture}
              sx={{ width: mobile ? 50 : 75, height: mobile ? 50 : 75 }}
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <Typography variant={mobile ? 'h6' : 'h5'}>
                {userData?.username}
              </Typography>
              {showIsTyping && (
                <Typography variant="body2" color="GrayText">
                  Typing...
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 0, marginTop: 4 }}>
          <Tooltip title="Chat options">
            <IconButton
              size="large"
              aria-label="chat options"
              aria-controls="chat-options"
              aria-haspopup="true"
              onClick={handleOpenChatMenu}
              sx={{ p: 0 }}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="chat-options"
            anchorEl={chatMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(chatMenu)}
            onClose={handleCloseChatMenu}
          >
            {chatOptions?.map((setting: IChatOptions) => (
              <MenuItem
                key={setting.label}
                onClick={() => setting.handler(chat._id)}
              >
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {/* messages body */}
      <Box
        display={'flex'}
        flexDirection={'column'}
        // justifyContent={'flex-end'}
        mt={2}
        justifyItems={'flex-end'}
        sx={{
          height: '60vh',
          overflowY: 'scroll',
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
        }}
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
              sx={{ whiteSpace: 'normal' }}
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
        {/* {showIsTyping && (
          <Typography variant="body2" color="GrayText">
            {
              users.find(
                (u) => u?._id === chat.members.find((m) => m !== currentUser)
              )?.username
            }{' '}
            is typing...
          </Typography>
        )} */}
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
        <Button onClick={handleSend} disabled={newMessage === ''}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatBox;
