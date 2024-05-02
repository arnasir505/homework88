import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginMutation } from '../../types';
import {
  selectLoginError,
  selectLoginLoading,
} from '../../store/users/usersSlice';
import { login } from '../../store/users/usersThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Link,
  Alert,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#ff4500' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {error && (
          <Alert
            severity='error'
            variant='outlined'
            sx={{ mt: 5, width: '100%' }}
          >
            {error.error}
          </Alert>
        )}
        <Box component='form' onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label='Username'
                name='username'
                autoComplete='new-username'
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='password'
                label='Password'
                type='password'
                autoComplete='new-password'
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            loading={loading}
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            color='warning'
          >
            Sign in
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/register' variant='body2'>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
