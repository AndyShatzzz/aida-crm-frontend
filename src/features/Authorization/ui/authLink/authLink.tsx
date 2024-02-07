import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import css from './authLink.module.scss';

export interface IAuthLinkProps {
  infoText: string;
  authLink: string;
  authRoute: string;
}

export const AuthLink: FC<IAuthLinkProps> = ({ infoText, authRoute, authLink }) => {
  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Typography>
        {infoText}
        <Link
          to={authRoute}
          className={css.link}
          // style={{ marginLeft: '2px', textDecoration: 'none', color: '#00f' }}
        >
          {authLink}
        </Link>
      </Typography>
    </Box>
  );
};
