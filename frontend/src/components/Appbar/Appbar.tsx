import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  styled,
  Grid,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const LogoLink = styled(NavLink)({
  color: '#ff4500',
  textDecoration: 'none',
});

const Appbar: React.FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                <LogoLink to='/'>Forum</LogoLink>
              </Typography>
              {user ? <UserMenu user={user} /> : <AnonymousMenu />}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Appbar;
