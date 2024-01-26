import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Avatar, Button, Tooltip, Drawer } from '@mui/material';
import useGermanStore from '../../../store';
import { auth } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import CustomSwitch from '../../switch';

const pages = [
  {
    name: 'Home',
    url: '/',
    icon: <HomeIcon sx={{ marginRight: 1 }} />,
  },
  {
    name: 'Verbs',
    url: '/verbs',
    icon: <DescriptionIcon sx={{ marginRight: 1 }} />,
  },
  {
    name: 'Articles',
    url: '/articles',
    icon: <MenuBookIcon sx={{ marginRight: 1 }} />,
  },
  {
    name: 'Sentences',
    url: '/sentences',
    icon: <SubtitlesIcon sx={{ marginRight: 1 }} />,
  },
  {
    name: 'Dictionary',
    url: '/dictionary',
    icon: <TranslateIcon sx={{ marginRight: 1 }} />,
  },
];

interface ISettings {
  type: 'route' | 'setting';
  label: string;
  handler?: () => void | null;
  icon: React.ReactElement;
}

function Navbar() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const [darkMode, setDarkMode] = React.useState<boolean>(store.darkMode);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        store.logout();
        window.location.href = '/';
        // Sign-out successful.
      })
      .catch((error) => {
        console.log('Sign out error: ', error);
        // An error happened.
      });
  };
  const routeHandler = (route: string) => {
    window.location.href = `/#/${route}`;
    handleCloseUserMenu();
  };
  const darkModeHandler = () => {
    setDarkMode((prev) => !prev);
  };
  const settings: ISettings[] = [
    {
      type: 'route',
      label: 'Profile',
      handler: () => routeHandler('profile'),
      icon: darkMode ? (
        <Person2Icon sx={{ marginRight: 1 }} />
      ) : (
        <Person2OutlinedIcon sx={{ marginRight: 1 }} />
      ),
    },
    {
      type: 'route',
      label: 'Progress',
      handler: () => routeHandler('progress'),
      icon: <TrendingUpIcon sx={{ marginRight: 1 }} />,
    },
    {
      type: 'route',
      label: 'Messages',
      handler: () => routeHandler('chat'),
      icon: darkMode ? (
        <ChatIcon sx={{ marginRight: 1 }} />
      ) : (
        <ChatOutlinedIcon sx={{ marginRight: 1 }} />
      ),
    },
    // { label: 'Dashboard' },
    // {
    //   type: 'setting',
    //   label: `${darkMode ? 'Light' : 'Dark'}  mode`,
    //   handler: darkModeHandler,
    //   icon: darkMode ? (
    //     <NightlightRoundIcon sx={{ marginRight: 1 }} />
    //   ) : (
    //     <NightlightOutlinedIcon sx={{ marginRight: 1 }} />
    //   ),
    // },
    // {
    //   type: 'route',
    //   label: 'Send feedback',
    //   handler: logoutHandler,
    //   icon: <FeedbackIcon sx={{ marginRight: 1 }} />,
    // },
    {
      type: 'setting',
      label: 'Logout',
      handler: logoutHandler,
      icon: <LogoutIcon sx={{ marginRight: 1 }} />,
    },
  ];

  // <MenuItem key={'Toogle mode'} onClick={handleToggleDarkMode}>
  //   {darkMode ? (
  //     <NightlightRoundIcon sx={{ marginRight: 1 }} />
  //   ) : (
  //     <NightlightOutlinedIcon sx={{ marginRight: 1 }} />
  //   )}
  //   <Typography textAlign="center">
  //     {darkMode ? 'Light' : 'Dark'} Mode
  //   </Typography>
  // </MenuItem>
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorElNav(event.currentTarget);
    setIsDrawerOpen(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
    setIsDrawerOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  React.useEffect(() => {
    store.setDarkMode(darkMode);
  }, [darkMode]);
  React.useEffect(() => {
    setDarkMode(store.darkMode);
  }, [store.darkMode]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 2,
              cursor: 'pointer',
            }}
            onClick={() => (window.location.href = '/')}
          >
            <img src="logo-clear-white-1.png" alt="Logo" width={150} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.url}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu> */}
            <Drawer
              anchor={'left'}
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box
                pt={2}
                // mr={4}
                mt={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                height={'100%'}
              >
                <Box padding={0}>
                  <Typography variant="h6" marginBottom={2} ml={2}>
                    Jump to:{' '}
                  </Typography>
                  {pages.map((page) => {
                    return (
                      <MenuItem
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ padding: 0 }}
                      >
                        {/* <Link to={page.url}>
                        <Typography
                          color={darkMode ? 'white' : 'black'}
                          textAlign="center"
                        >
                          {page.name}
                        </Typography>
                      </Link> */}
                        <Button
                          href={'/#' + page.url}
                          variant="contained"
                          fullWidth
                          color={page.name.toLowerCase()}
                          sx={{
                            // mb: page.name === 'Home' ? 2 : 0,
                            mb: 0,
                            display: 'flex',
                            justifyContent: 'start',
                            color: 'white',
                            borderRadius: 0,
                            paddingY: 3,
                            paddingX: 5,
                          }}
                        >
                          {page.icon}
                          <Typography
                            color={'white'}
                            // textAlign="center"
                          >
                            {page.name}
                          </Typography>
                        </Button>
                      </MenuItem>
                    );
                  })}
                </Box>
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box>
                    <Box ml={2} my={3}>
                      <CustomSwitch
                        left={'Dark mode'}
                        value={darkMode}
                        onChange={handleToggleDarkMode}
                      />
                    </Box>
                    <MenuItem onClick={handleCloseNavMenu} sx={{ padding: 0 }}>
                      <Button
                        href={'/#/send-feedback'}
                        variant="contained"
                        fullWidth
                        color="primary"
                        sx={{
                          // mb: page.name === 'Home' ? 2 : 0,
                          mb: 0,
                          display: 'flex',
                          justifyContent: 'start',
                          color: 'white',
                          borderRadius: 0,
                          paddingY: 3,
                          paddingX: 5,
                        }}
                      >
                        <FeedbackIcon sx={{ marginRight: 1 }} />
                        <Typography
                          color={'white'}
                          // textAlign="center"
                        >
                          Send feedback
                        </Typography>
                      </Button>
                    </MenuItem>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <img src="logo-clear-white-1.png" alt="Logo" width={150} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              columnGap: 2,
              marginLeft: 2,
            }}
          >
            {pages.map((page) => {
              if (page.name !== 'Home')
                return (
                  <Link
                    key={page.name}
                    to={page.url}
                    // onClick={handleCloseNavMenu}
                    // sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Typography textAlign="center" color={'white'} mt={1}>
                      {page.name}
                    </Typography>
                  </Link>
                );
            })}
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            {store.user && (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} mr={2} mt={1}>
                  <Link to={'/chat'} style={{ color: 'white' }}>
                    {darkMode ? <ChatIcon /> : <ChatOutlinedIcon />}
                  </Link>
                </Box>
              </>
            )}
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
              mr={2}
              mt={1}
            >
              <Box onClick={handleToggleDarkMode} style={{ color: 'white' }}>
                {darkMode ? (
                  <NightlightRoundIcon />
                ) : (
                  <NightlightOutlinedIcon />
                )}
              </Box>
            </Box>
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
              mr={2}
              mt={1}
            >
              <Link to={'/send-feedback'} style={{ color: 'white' }}>
                {darkMode ? <FeedbackIcon /> : <FeedbackOutlinedIcon />}
              </Link>
            </Box>
            {store.user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={store.user.firstName + '' + store.user.lastName}
                      src={store.user?.profilePicture}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting: ISettings) => {
                    if (setting.type === 'route')
                      return (
                        <MenuItem key={setting.label} onClick={setting.handler}>
                          {setting.icon}
                          <Typography textAlign="center">
                            {setting.label}
                          </Typography>
                        </MenuItem>
                      );

                    if (setting.type === 'setting')
                      return (
                        <>
                          <Divider />
                          <MenuItem
                            key={setting.label}
                            onClick={setting.handler}
                          >
                            {setting.icon}
                            <Typography textAlign="center">
                              {setting.label}
                            </Typography>
                          </MenuItem>
                        </>
                      );
                  })}
                </Menu>
              </Box>
            )}
            {store.user === null && (
              <Box sx={{ flexGrow: 0 }}>
                <Button variant="outlined" color="inherit" href="/#/sign-in">
                  Sign in
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
