import { useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useGermanStore from '../../store';
import Conversation from '../../components/conversation';
import { io } from 'socket.io-client';
import { IChat, IMessage } from '../../types/interfaces';
import ChatBox from '../../components/chat-box';
import { Autocomplete, TextField } from '@mui/material';
import { IUser } from '../../store/slices/auth';

export default function Chat() {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;

  const socket = useRef();

  type SocketUser = {
    userId: string;
    socketId: string;
  };

  const [chats, setChats] = useState<IChat[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  // Get the chat in chat section
  const getChats = async () => {
    if (store?.user?._id) {
      try {
        const res = await fetch(`${apiUrl}/chat/${store?.user?._id}`);
        const response = await res.json();
        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Get all users
  const getUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/all`);
      const response = await res.json();
      setUsers(
        response.data.filter((user: IUser) => user?._id !== store.user?._id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, [store?.user?._id]);
  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:8800');
    socket?.current?.emit('new-user-add', store?.user?._id);
    socket?.current?.on('get-users', (users: string[]) => {
      setOnlineUsers(users);
    });
  }, [store.user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket?.current?.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket?.current?.on('recieve-message', (data) => {
      setReceivedMessage(data);
      getChats();
    });
  }, []);
  useEffect(() => {
    getUsers();
  }, []);

  const checkOnlineStatus = (chat: IChat) => {
    const chatMember = chat.members.find(
      (member: string) => member !== store?.user?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleSelectUser = async (user: IUser) => {
    //find if the chat with these two users exists
    const chatRes = await fetch(
      `${apiUrl}/chat/find/${user?._id}/${store.user?._id}`
    );
    //if exists, set it as current chat
    if (chatRes.status === 200) {
      const chat = await chatRes.json();

      setCurrentChat(chat.data);
    } else if (chatRes.status === 404) {
      const newChat = {
        senderId: store.user?._id,
        receiverId: user?._id,
      };
      const chatRes = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChat),
      });
      if (chatRes.status === 201) {
        const chat = await chatRes.json();
        if (chat) {
          setCurrentChat(chat.data);
          getChats();
        }
      }
    }
    //if not, create a new chat and set it as current
  };
  return (
    <Container component="main" maxWidth="xl" sx={{ minHeight: '73dvh' }}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left',
          justifyContent: 'center',
          // minHeight: '80vh',
        }}
      >
        <Box flex={1}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="/"

            sx={{
              mb: 2,
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MESSAGES
          </Typography>
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            value={receiver}
            onChange={(event: any, newValue: IUser | null) => {
              handleSelectUser(newValue);
            }}
            options={users} // Assuming users is an array of objects with a 'username' property
            getOptionLabel={(user: IUser) => user?.username} // Specify how to get the display label for each option
            sx={{ width: 300, mt: 2, mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Search users.." />
            )}
          />
          {store.user &&
            chats?.map((chat) => (
              <MenuItem
                onClick={() => setCurrentChat(chat)}
                sx={{
                  backgroundColor:
                    chat._id === currentChat?._id ? 'lightgrey' : 'white',
                }}
              >
                <Conversation
                  key={chat._id}
                  data={chat}
                  currentUser={store?.user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </MenuItem>
            ))}
        </Box>

        <Box flex={3}>
          <Box>
            {currentChat && store?.user?._id ? (
              <ChatBox
                chat={currentChat}
                currentUser={store?.user?._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            ) : (
              <Typography variant="h5">
                Click on a chat to start conversation...
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
