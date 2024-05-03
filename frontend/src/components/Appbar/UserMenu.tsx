import { Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../store/users/usersThunks';
import { selectLogoutLoading } from '../../store/users/usersSlice';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAncorEl] = useState<HTMLElement | null>(null);
  const loading = useAppSelector(selectLogoutLoading);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAncorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAncorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <>
      <Button color='inherit' onClick={handleClick}>
        Hello, {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>
          <Link
            to='/new-post'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Add new post
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {loading && (
            <CircularProgress size={20} sx={{ mr: 1 }} color='warning' />
          )}
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
