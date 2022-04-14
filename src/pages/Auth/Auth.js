import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formData);

    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const changeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const switchModeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const showPasswordHandler = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccessHandler = async (res) => {
    const result = res ? res.profileObj : null;
    const token = res ? res.tokenId : null;

    try {
      dispatch({ type: 'AUTH', payload: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }

    console.log(res);
  };

  const googleFailureHandler = () => {
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'secondary.main',
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            {isSignup && (
              <React.Fragment>
                <Input
                  half
                  name="firstName"
                  label="First Name"
                  changeHandler={changeHandler}
                />
                <Input
                  half
                  name="lastName"
                  label="Last Name"
                  changeHandler={changeHandler}
                />
              </React.Fragment>
            )}
            <Input
              name="email"
              label="Email Address"
              changeHandler={changeHandler}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              changeHandler={changeHandler}
              showPasswordHandler={showPasswordHandler}
              type={showPassword ? 'text' : 'password'}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                changeHandler={changeHandler}
              />
            )}
          </Grid>
          {!isSignup && (
            <GoogleLogin
              clientId="150443798547-0jmqbphu0g13jj058suuj9q367i9eiql.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccessHandler}
              onFailure={googleFailureHandler}
              cookiePolicy="single_host_origin"
            />
          )}

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ mt: 1 }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={switchModeHandler}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account ? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
