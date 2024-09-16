import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Builder', path: '/builder' },
    { label: 'Templates', path: '/templates' },
    { label: 'Database', path: '/database' },
    { label: 'API Integration', path: '/api-integration' },
  ];

  const renderMenuItems = () => {
    return menuItems.map((item) => (
      <MenuItem
        key={item.path}
        onClick={handleClose}
        component={RouterLink}
        to={item.path}
      >
        {item.label}
      </MenuItem>
    ));
  };

  const renderButtons = () => {
    return menuItems.map((item) => (
      <Button
        key={item.path}
        color="inherit"
        component={RouterLink}
        to={item.path}
      >
        {item.label}
      </Button>
    ));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NoCode Startup SaaS
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {renderMenuItems()}
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/settings"
                  >
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/login"
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/register"
                  >
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {renderButtons()}
            {currentUser ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/settings"
                >
                  Settings
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;