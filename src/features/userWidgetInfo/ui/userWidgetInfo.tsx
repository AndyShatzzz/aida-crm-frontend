import css from './userWidgetInfo.module.scss';
import { Avatar, IconButton, Menu, MenuItem, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import { SnackbarAlert } from '../../../shared/snackbarAlert/snackbarAlert';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { usersRequest } from '../../../shared/api/usersRequest/UsersRequest';

export const UserWidgetInfo = () => {
  const { data, error, isLoading } = usersRequest.useGetUserInfoQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWT');
    navigate('/signin');
    dispatch(usersRequest.util.resetApiState());
  };

  return (
    <Stack
      sx={{ flexGrow: 1 }}
      direction="row"
    >
      {isLoading && (
        <>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{ width: '32px', height: '32px' }}
          ></Skeleton>
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ width: '37px', height: '32px', marginLeft: '8px' }}
          ></Skeleton>
        </>
      )}
      {error && (
        <Snackbar
          autoHideDuration={4000}
          open={!isSnackbarOpen}
          onClose={() => setIsSnackbarOpen(state => !state)}
        >
          <SnackbarAlert
            severity="error"
            onClose={() => setIsSnackbarOpen(state => !state)}
          >
            Произошла ошибка, пожалуйста обновите страницу
          </SnackbarAlert>
        </Snackbar>
      )}
      {data && (
        <>
          <IconButton
            id="user-button"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar
              sx={{ width: '32px', height: '32px' }}
              className={css.avatar}
              sizes="small"
              src={data.avatar}
            />
            <Typography
              className={css.userName}
              variant="body1"
              component="div"
              color="common.white"
              paddingLeft={1}
              sx={{ width: '37px', height: '32px' }}
            >
              {data.name}
            </Typography>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'user-button'
            }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
          </Menu>
        </>
      )}
    </Stack>
  );
};
