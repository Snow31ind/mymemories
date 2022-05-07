import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import HideOnScroll from './HideOnScroll';
import GrowBox from '../StyledComponents/GrowBox';

export default function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    navigate('/');

    setUser(null);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar color="inherit" sx={{ display: 'flex' }}>
        <Toolbar sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <img src={'/favicon.ico'} alt="My memories" height={40} /> */}
            <Typography
              color="primary"
              variant="h5"
              sx={{
                ml: 1,
                textDecoration: 'none',
                '&:hover': {
                  color: 'tomato',
                },
              }}
              component={Link}
              to="/"
            >
              Memories
            </Typography>
          </Box>
          <GrowBox />
          {user ? (
            <Box sx={{ display: 'flex' }}>
              <Avatar
                alt={user.result.name}
                src={user.result.imageUrl}
                sx={{ mr: 1 }}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                onClick={logoutHandler}
                color="secondary"
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              variant="text"
              color="secondary"
              to="/auth"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
