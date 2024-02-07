import css from './userWidgetInfo.module.scss';
import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { usersRequest } from '../../../../shared/api/usersRequest/UsersRequest';
import { setFalse } from '../../../checkToken/config/initLoggedInSlice';
import { UserWidgetSkeleton } from '../userWidgetSkeleton/userWidgetSkeleton';
import { UserWidgetSnackbar } from '../userWidgetSnackbar/userWidgetSnackbar';

export const UserWidgetInfo = () => {
  const { data, error, isLoading } = usersRequest.useGetUserInfoQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWT');
    dispatch(setFalse());
    navigate('/signin');
    dispatch(usersRequest.util.resetApiState());
  };

  return (
    <Stack
      sx={{ flexGrow: 1 }}
      direction="row"
    >
      {isLoading && <UserWidgetSkeleton />}
      {error && (
        <UserWidgetSnackbar
          isSnackbarOpen={isSnackbarOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
        />
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
