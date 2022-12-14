import { useState } from 'react';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Logo from "./images/logo.png";
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';

const ResponsiveAppBar = () => {
  const auth = useContext(AuthContext);
  const [setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleContactMenu = () => {
    setAnchorElNav(null);
    document.location.href = '/contact-us';
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignInClick = () => {
    document.location.href = "/sign-in";
  };

  const handleSignUpClick = () => {
    document.location.href = "/sign-up";
  };

  const handleLogoutClick = () => {
    document.location.href = "/";
    auth.logout();
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      document.location.href = `/search/${e.target.value}`;
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 30,
              mr: 1,
              display: { xs: 'none', md: 'flex' },
            }}
            alt="NPCompletionist"
            src={Logo}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 500,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '24px',
            }}
          >
            NPCompletionist
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              href="/featured"
              onClick={handleContactMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Featured Games
            </Button>
            <Button
              href="/contact-us"
              onClick={handleContactMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Contact
            </Button>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={keyPress}
              placeholder="Find games"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {auth.user && (<Button variant="contained" color="primary" sx={{ mr: 2 }} href="/backlog">View Backlog</Button>)}

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {!auth.user && (<Avatar />)}
              {auth.user && (<Avatar alt="User Avatar" src="/images/logged_in_avatar.png" />)}
            </IconButton>
            <Menu
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
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 6,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              disableScrollLock={true}
            >
              {!auth.user && (<MenuItem key="signIn" onClick={handleSignInClick} direction="row">
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon> Sign In
              </MenuItem>)}
              {!auth.user && (<MenuItem key="signUp" onClick={handleSignUpClick}>
                <ListItemIcon>
                  <PersonAddAlt1Icon fontSize="small" />
                </ListItemIcon>
                Sign Up
              </MenuItem>)}
              {auth.user && (<MenuItem key="usernameDisplay" disabled={true}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon> {auth.user.username}
              </MenuItem>)}
              {auth.user && (<Divider />)}
              {auth.user && (<MenuItem key="logout" onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;