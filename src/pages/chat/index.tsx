import { useCallback, useEffect, useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import useGermanStore from '../../store';
import Conversation from '../../components/conversation';
import { io, Socket } from 'socket.io-client';
import { IChat, IMessage } from '../../types/interfaces';
import ChatBox from '../../components/chat-box';
import { Autocomplete, Drawer, Menu, TextField } from '@mui/material';
import { IUser } from '../../store/slices/auth';
import { ApiError, apiFetch } from '../../api/client';
import { getInitials } from '../../utils/helpers';

export default function Chat() {
  const store = useGermanStore();
  const socketUrl = import.meta.env.VITE_SOCKET_URL;
  const userId = store.user?._id;

  const socket = useRef<Socket | null>(null);

  type SocketUser = {
    userId: string;
  };
  type TypingEvent = {
    senderId: string;
    isTyping: boolean;
  };

  const [chats, setChats] = useState<IChat[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);
  const [receivedMessage, setReceivedMessage] = useState<IMessage | null>(null);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingEvent, setTypingEvent] = useState<TypingEvent | null>(null);
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
      await apiFetch(`/chat/markAsRead/${chat._id}`, { method: 'POST' });
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
  const getChats = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await apiFetch<{ data: IChat[] }>(`/chat/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  // Get all users
  const getUsers = async () => {
    try {
      const response = await apiFetch<{ data: IUser[] }>('/users/all');
      setUsers(response.data.filter((user: IUser) => user?._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, [getChats]);
  useEffect(() => {
    getUsers();
  }, []);

  // One socket per signed-in user, closed when leaving the page.
  // The auth callback fetches a fresh socket token on every (re)connect.
  useEffect(() => {
    if (!userId) return;
    const connection = io(socketUrl, {
      auth: (cb) => {
        apiFetch<{ token: string }>('/auth/socket-token')
          .then(({ token }) => cb({ token }))
          .catch(() => cb({}));
      },
    });
    connection.on('get-users', (users: SocketUser[]) => setOnlineUsers(users));
    connection.on('recieve-message', (data: IMessage) => {
      setReceivedMessage(data);
      getChats();
    });
    connection.on('receive-is-typing', (data: TypingEvent) => setTypingEvent(data));
    socket.current = connection;
    return () => {
      connection.disconnect();
      socket.current = null;
    };
  }, [userId, socketUrl, getChats]);

  const partnerId = currentChat?.members.find((u) => u !== userId);
  const showIsTyping =
    !!typingEvent?.isTyping && typingEvent.senderId === partnerId;

  // Send a message that is already saved in the database to the receiver
  const sendToSocket = (message: IMessage & { receiverId: string }) => {
    socket.current?.emit('send-message', message);
  };

  useEffect(() => {
    if (!partnerId) return;
    socket.current?.emit('is-typing', { receiverId: partnerId, isTyping });
  }, [isTyping]);

  const handleChatDeleted = () => {
    setCurrentChat(null);
    getChats();
  };

  const checkOnlineStatus = (chat: IChat) => {
    const chatMember = chat.members.find(
      (member: string) => member !== store?.user?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleSelectUser = async (user: IUser | null) => {
    if (!user) return;
    try {
      //find if the chat with these two users exists
      const chat = await apiFetch<{ data: IChat }>(
        `/chat/find/${user._id}/${userId}`
      );
      handleOpenChat(chat.data);
    } catch (error) {
      //if not, create a new chat and set it as current
      if (error instanceof ApiError && error.status === 404) {
        const chat = await apiFetch<{ data: IChat }>('/chat', {
          method: 'POST',
          body: JSON.stringify({ receiverId: user._id }),
        });
        setCurrentChat(chat.data);
        getChats();
      } else console.log(error);
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
                sx={{ width: '100%', mt: 2, mb: 3 }}
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
                    {option?.profilePicture !== '' ? (
                      <Avatar
                        sx={{ width: 30, height: 30, marginRight: 1 }}
                        alt={option?.firstName + ' ' + option?.lastName}
                        src={option?.profilePicture}
                      />
                    ) : (
                      <Avatar
                        sx={{ width: 30, height: 30, marginRight: 1 }}
                        alt={option?.firstName + ' ' + option?.lastName}
                        src={option?.profilePicture}
                      >
                        <Typography variant="body2">
                          {getInitials(option?.firstName, option?.lastName)}
                        </Typography>
                      </Avatar>
                    )}
                    {option?.username}
                  </Box>
                )}
                // sx={{ width: 300, mt: 2, mb: 3 }}
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
                      // sx={{
                      //   backgroundColor:
                      //     chat._id === currentChat?._id ? '#FF0000' : '#FF0000',
                      //   color:
                      //     chat._id === currentChat?._id ? '#FF0000' : '#FF0000',
                      // }}
                    >
                      <Conversation
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
                  sendToSocket={sendToSocket}
                  onDeleted={handleChatDeleted}
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
              sx={{ width: '100%', mt: 2, mb: 3 }}
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
                  {option?.profilePicture !== '' ? (
                    <Avatar
                      sx={{ width: 30, height: 30, marginRight: 1 }}
                      alt={option?.firstName + ' ' + option?.lastName}
                      src={option?.profilePicture}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 30, height: 30, marginRight: 1 }}
                      alt={option?.firstName + ' ' + option?.lastName}
                      src={option?.profilePicture}
                    >
                      <Typography variant="body2">
                        {getInitials(option?.firstName, option?.lastName)}
                      </Typography>
                    </Avatar>
                  )}
                  {option?.username}
                </Box>
              )}
              // sx={{ width: 300, mt: 2, mb: 3 }}
              renderInput={(params) => (
                <TextField {...params} label="Search users.." />
              )}
            />
            {store.user &&
              chats?.map((chat) => (
                <MenuItem
                  key={chat._id}
                  onClick={() => handleOpenChat(chat)}
                  selected={chat._id === currentChat?._id}
                >
                  <Conversation
                    data={chat}
                    currentUser={store?.user?._id}
                    online={checkOnlineStatus(chat)}
                    currentChat={currentChat}
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
                  sendToSocket={sendToSocket}
                  onDeleted={handleChatDeleted}
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
