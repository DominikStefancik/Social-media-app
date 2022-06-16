import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../components/Copyright';
import { WEB_CLIENT_ROOT, WEB_CLIENT_REGISTER, WEB_CLIENT_HOME } from '../urls';
import { ApolloError, useMutation } from '@apollo/client';
import { FormInputName, FormLinkProps } from '../types';
import { LOGIN_USER_MUTATION } from '../mutations';
import { AuthContext } from '../../context/AuthProvider';

const theme = createTheme();

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [invalidInput, setInvalidInput] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    variables: {
      username,
      password,
    },
    // the update function will be run after the the mutation successfully finishes
    update(_, result) {
      setUsername('');
      setPassword('');
      setInvalidInput('');
      setError('');

      // after a user successfully logs in, we need to update the authContext to set the user's data
      authContext.authenticateUser(result.data.loginUser);
      navigate(WEB_CLIENT_HOME, { replace: true });
    },
    onError(error: ApolloError) {
      const inputs = error.graphQLErrors[0].extensions.inputs as Object;
      const input = inputs ? Object.values(inputs)[0] : '';
      setInvalidInput(input);
      setError(error.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(/images/vintage-post.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                error={invalidInput === FormInputName.USERNAME}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                error={invalidInput === FormInputName.PASSWORD}
                onChange={(event) => setPassword(event.target.value)}
              />
              {loading && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={35} sx={{ mt: 1 }} />
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" style={{ ...FormLinkProps }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to={`${WEB_CLIENT_ROOT}${WEB_CLIENT_REGISTER}`}
                    style={{ ...FormLinkProps }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
