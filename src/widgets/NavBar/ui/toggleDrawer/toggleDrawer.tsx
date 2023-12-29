import React, { FC } from 'react';
import css from './toggleDrawer.module.scss';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import TapasIcon from '@mui/icons-material/Tapas';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { IToggleDrawerProps } from '../../type/IToggleDrawerProps';

export const ToggleDrawer: FC<IToggleDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box className={css.container}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <Link
                className={css.link}
                to={'/users'}
              >
                <ListItemText color="inherit">Пользователи</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TapasIcon />
              </ListItemIcon>
              <Link
                className={css.link}
                to={'/products'}
              >
                <ListItemText color="inherit">Продукты</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <Link
                className={css.link}
                to={'#'}
              >
                <ListItemText color="inherit">Чеки</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <StackedLineChartIcon />
              </ListItemIcon>
              <Link
                className={css.link}
                to={'#'}
              >
                <ListItemText color="inherit">Статистика</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <Link
                className={css.link}
                to={'/menu'}
              >
                <ListItemText color="inherit">Быстрые продажи</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
