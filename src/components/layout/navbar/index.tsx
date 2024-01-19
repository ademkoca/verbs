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
import { Avatar, Button, Tooltip } from '@mui/material';
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
import Divider from '@mui/material/Divider';

const pages = [
  { name: 'Articles', url: '/articles' },
  { name: 'Verbs', url: '/' },
  { name: 'Dictionary', url: '/dictionary' },
  { name: 'Sentences', url: '/sentences' },
];

interface ISettings {
  label: string;
  handler?: () => void | null;
  icon: React.ReactElement;
}

function Navbar() {
  const store = useGermanStore();
  const [darkMode, setDarkMode] = React.useState<boolean>(store.darkMode);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        store.logout();
        window.location.href = '/#/sign-in';
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
  const settings: ISettings[] = [
    {
      label: 'Profile',
      handler: () => routeHandler('profile'),
      icon: darkMode ? (
        <Person2Icon sx={{ marginRight: 1 }} />
      ) : (
        <Person2OutlinedIcon sx={{ marginRight: 1 }} />
      ),
    },
    {
      label: 'Progress',
      handler: () => routeHandler('progress'),
      icon: <TrendingUpIcon sx={{ marginRight: 1 }} />,
    },
    {
      label: 'Messages',
      handler: () => routeHandler('chat'),
      icon: darkMode ? (
        <ChatIcon sx={{ marginRight: 1 }} />
      ) : (
        <ChatOutlinedIcon sx={{ marginRight: 1 }} />
      ),
    },
    // { label: 'Dashboard' },
    {
      label: 'Logout',
      handler: logoutHandler,
      icon: <LogoutIcon sx={{ marginRight: 1 }} />,
    },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
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
            <Menu
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
            </Menu>
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
            {pages.map((page) => (
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
            ))}
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            {store.user && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }} mr={2} mt={1}>
                <Link to={'/chat'} style={{ color: 'white' }}>
                  <ChatIcon />
                </Link>
              </Box>
            )}
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
                  <MenuItem key={'Toogle mode'} onClick={handleToggleDarkMode}>
                    {darkMode ? (
                      <NightlightRoundIcon sx={{ marginRight: 1 }} />
                    ) : (
                      <NightlightOutlinedIcon sx={{ marginRight: 1 }} />
                    )}
                    <Typography textAlign="center">
                      {darkMode ? 'Light' : 'Dark'} Mode
                    </Typography>
                  </MenuItem>
                  {settings.map((setting: ISettings) => {
                    if (setting.label !== 'Logout')
                      return (
                        <MenuItem key={setting.label} onClick={setting.handler}>
                          {setting.icon}
                          <Typography textAlign="center">
                            {setting.label}
                          </Typography>
                        </MenuItem>
                      );
                    if (setting.label === 'Logout')
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
