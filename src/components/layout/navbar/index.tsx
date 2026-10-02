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
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Tooltip, Drawer } from '@mui/material';
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
import useGermanStore from '../../../store';
import { auth } from '../../../utils/firebase';
import CustomSwitch from '../../switch';
import { getInitials } from '../../../utils/helpers';

type PageColor = 'home' | 'verbs' | 'articles' | 'sentences' | 'dictionary';

const pages: { name: string; url: string; color: PageColor; icon: React.ReactElement }[] = [
  { name: 'Home', url: '/', color: 'home', icon: <HomeIcon sx={{ marginRight: 1 }} /> },
  { name: 'Verbs', url: '/verbs', color: 'verbs', icon: <DescriptionIcon sx={{ marginRight: 1 }} /> },
  { name: 'Articles', url: '/articles', color: 'articles', icon: <MenuBookIcon sx={{ marginRight: 1 }} /> },
  { name: 'Sentences', url: '/sentences', color: 'sentences', icon: <SubtitlesIcon sx={{ marginRight: 1 }} /> },
  { name: 'Dictionary', url: '/dictionary', color: 'dictionary', icon: <TranslateIcon sx={{ marginRight: 1 }} /> },
];

const drawerButtonSx = {
  mb: 0,
  display: 'flex',
  justifyContent: 'start',
  color: 'white',
  borderRadius: 0,
  paddingY: 3,
  paddingX: 5,
};

function Navbar() {
  const user = useGermanStore((s) => s.user);
  const darkMode = useGermanStore((s) => s.darkMode);
  const setDarkMode = useGermanStore((s) => s.setDarkMode);
  const logout = useGermanStore((s) => s.logout);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const closeUserMenu = () => setAnchorElUser(null);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const goTo = (route: string) => {
    closeUserMenu();
    navigate(route);
  };

  const logoutHandler = async () => {
    closeUserMenu();
    try {
      await signOut(auth);
      logout();
      navigate('/');
    } catch (error) {
      console.log('Sign out error: ', error);
    }
  };

  const userMenuRoutes = [
    {
      label: 'Profile',
      route: '/profile',
      icon: darkMode ? <Person2Icon sx={{ marginRight: 1 }} /> : <Person2OutlinedIcon sx={{ marginRight: 1 }} />,
    },
    { label: 'Progress', route: '/progress', icon: <TrendingUpIcon sx={{ marginRight: 1 }} /> },
    {
      label: 'Messages',
      route: '/chat',
      icon: darkMode ? <ChatIcon sx={{ marginRight: 1 }} /> : <ChatOutlinedIcon sx={{ marginRight: 1 }} />,
    },
  ];

  const logo = <img src="/logo-clear-white-1.png" alt="Logo" width={150} />;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
          >
            {logo}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={() => setIsDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <Box
                pt={2}
                mt={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                height={'100%'}
              >
                <Box padding={0}>
                  <Typography variant="h6" marginBottom={2} ml={2}>
                    Jump to:
                  </Typography>
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={() => setIsDrawerOpen(false)} sx={{ padding: 0 }}>
                      <Button
                        component={Link}
                        to={page.url}
                        variant="contained"
                        fullWidth
                        color={page.color}
                        sx={drawerButtonSx}
                      >
                        {page.icon}
                        <Typography color={'white'}>{page.name}</Typography>
                      </Button>
                    </MenuItem>
                  ))}
                </Box>
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box ml={2} my={3}>
                    <CustomSwitch left={'Dark mode'} value={darkMode} onChange={toggleDarkMode} />
                  </Box>
                  <MenuItem onClick={() => setIsDrawerOpen(false)} sx={{ padding: 0 }}>
                    <Button
                      component={Link}
                      to="/send-feedback"
                      variant="contained"
                      fullWidth
                      color="primary"
                      sx={drawerButtonSx}
                    >
                      <FeedbackIcon sx={{ marginRight: 1 }} />
                      <Typography color={'white'}>Send feedback</Typography>
                    </Button>
                  </MenuItem>
                </Box>
              </Box>
            </Drawer>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <Link to="/">{logo}</Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              columnGap: 2,
              marginLeft: 2,
            }}
          >
            {pages
              .filter((page) => page.name !== 'Home')
              .map((page) => (
                <Link key={page.name} to={page.url}>
                  <Typography textAlign="center" color={'white'} mt={1}>
                    {page.name}
                  </Typography>
                </Link>
              ))}
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            {user && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }} mr={2} mt={1}>
                <Link to={'/chat'} style={{ color: 'white' }} aria-label="Messages">
                  {darkMode ? <ChatIcon /> : <ChatOutlinedIcon />}
                </Link>
              </Box>
            )}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }} mr={2} mt={1}>
              <Box
                component="button"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                sx={{ color: 'white', background: 'none', border: 0, p: 0, cursor: 'pointer' }}
              >
                {darkMode ? <NightlightRoundIcon /> : <NightlightOutlinedIcon />}
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} mr={2} mt={1}>
              <Link to={'/send-feedback'} style={{ color: 'white' }} aria-label="Send feedback">
                {darkMode ? <FeedbackIcon /> : <FeedbackOutlinedIcon />}
              </Link>
            </Box>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src={user.profilePicture || undefined}
                    >
                      {getInitials(user.firstName, user.lastName)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={closeUserMenu}
                >
                  {userMenuRoutes.map((item) => (
                    <MenuItem key={item.label} onClick={() => goTo(item.route)}>
                      {item.icon}
                      <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={logoutHandler}>
                    <LogoutIcon sx={{ marginRight: 1 }} />
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button variant="outlined" color="inherit" component={Link} to="/sign-in">
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
