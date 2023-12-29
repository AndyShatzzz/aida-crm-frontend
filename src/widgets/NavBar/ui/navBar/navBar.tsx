import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { FC, useState } from 'react';
import { ButtonWidgetAuth } from '../../../../features/buttonWidgetAuth';
import { UserWidgetInfo } from '../../../../features/userWidgetInfo';
import { ToggleDrawer } from '../toggleDrawer/toggleDrawer';
import { INavBarProps } from '../../type/INavBarProps';
import { UseAppSelector } from '../../../../shared/hooks/useAppDispatch';

export const NavBar: FC<INavBarProps> = ({ pageTitle }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const initLoggedIn = UseAppSelector(state => state.initLoggedInSlice.loggedIn);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 18 }}
          >
            {pageTitle}
          </Typography>
          {initLoggedIn ? <UserWidgetInfo /> : <ButtonWidgetAuth />}
        </Toolbar>
        <ToggleDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </AppBar>
    </Box>
  );
};
