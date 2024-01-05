import { useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import useGermanStore from '../../store';
import Conversation from '../../components/conversation';
import { io } from 'socket.io-client';
import { IChat, IMessage } from '../../types/interfaces';
import ChatBox from '../../components/chat-box';
import { Autocomplete, Drawer, TextField } from '@mui/material';
import { IUser } from '../../store/slices/auth';

export default function Chat() {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const socketUrl = import.meta.env.VITE_SOCKET_URL;

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
  const [receivedMessage, setReceivedMessage] = useState<IMessage | null>(null);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showIsTyping, setShowIsTyping] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  const handleOpenChat = (chat: IChat) => {
    setCurrentChat(chat);
    markChatAsRead(chat);
  };

  const markChatAsRead = async (chat: IChat) => {
    try {
      await fetch(`${apiUrl}/chat/markAsRead/${chat._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (Boolean(!currentChat) && screenWidth < 1200) {
      setIsDrawerOpen(true);
    }
    if (Boolean(currentChat) && screenWidth < 1200) {
      setIsDrawerOpen(false);
    }
  }, [currentChat, screenWidth]);
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
        // response.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, [store?.user?._id]);
  useEffect(() => {
    getUsers();
  }, []);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(socketUrl);
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

  useEffect(() => {
    socket?.current?.emit('is-typing', {
      senderId: store.user?._id,
      receiverId: currentChat?.members.find((u) => u !== store.user?._id),
      isTyping: isTyping,
    });
  }, [isTyping]);

  // Get the message from socket server
  useEffect(() => {
    socket?.current?.on('recieve-message', (data) => {
      setReceivedMessage(data);
      getChats();
    });
  }, []);
  useEffect(() => {
    socket?.current?.on('receive-is-typing', (data) => {
      setShowIsTyping(data);
    });
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
      //if not, create a new chat and set it as current
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
    // if (isDrawerOpen) {
    //   setisDrawerOpen(false);
    // }
  };

  if (!store.user) {
    window.location.href = '/#/sign-in';
  }

  return (
    <Container
      component={'main'}
      maxWidth="xl"
      sx={{
        minHeight: '73dvh',
        paddingRight: screenWidth > 1200 ? 2 : 0,
        paddingLeft: screenWidth > 1200 ? 2 : 0,
      }}
    >
      <CssBaseline />

      {screenWidth < 1200 ? (
        //mobile view
        <>
          <Drawer
            anchor={'left'}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box p={3}>
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
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    display={'flex'}
                    {...props}
                  >
                    <Avatar
                      src={option?.profilePicture}
                      sx={{ width: 30, height: 30, marginRight: 1 }}
                    />
                    {option?.username}
                  </Box>
                )}
                sx={{ width: 300, mt: 2, mb: 3 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search users.." />
                )}
              />
              {store.user &&
                chats?.map((chat) => {
                  return (
                    <MenuItem
                      key={chat._id}
                      onClick={() => handleOpenChat(chat)}
                      sx={{
                        backgroundColor:
                          chat._id === currentChat?._id ? 'lightgrey' : 'white',
                      }}
                    >
                      <Conversation
                        // preview={getLatestMessage(chat._id) ?? ''}
                        key={chat._id}
                        data={chat}
                        currentUser={store?.user?._id}
                        online={checkOnlineStatus(chat)}
                        currentChat={currentChat}
                      />
                    </MenuItem>
                  );
                })}
            </Box>
          </Drawer>
          <Box>
            <Box>
              {currentChat && store?.user?._id ? (
                <ChatBox
                  mobile
                  setIsDrawerOpen={setIsDrawerOpen}
                  chat={currentChat}
                  currentUser={store?.user?._id}
                  setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage}
                  setIsTyping={setIsTyping}
                  showIsTyping={showIsTyping}
                  users={users}
                />
              ) : (
                <Box m={10} display={'flex'} justifyContent={'center'}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    Start a conversation
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        // desktop view
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
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  display={'flex'}
                  {...props}
                >
                  <Avatar
                    src={option?.profilePicture}
                    sx={{ width: 30, height: 30, marginRight: 1 }}
                  />
                  {option?.username}
                </Box>
              )}
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
                  setIsTyping={setIsTyping}
                  showIsTyping={showIsTyping}
                  users={users}
                />
              ) : (
                <Typography variant="h5">
                  Click on a chat to start conversation...
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
