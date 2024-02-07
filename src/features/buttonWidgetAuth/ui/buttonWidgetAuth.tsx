import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import css from './buttonWidgetAuth.module.scss';

export const ButtonWidgetAuth = () => {
  return (
    <>
      <Button
        color="inherit"
        sx={{ flexGrow: 1 }}
        size="small"
      >
        <Link
          to={'/signup'}
          className={css.linkButton}
        >
          Регистрация
        </Link>
      </Button>
      <Button
        color="inherit"
        sx={{ flexGrow: 1 }}
        size="small"
      >
        <Link
          to={'/signin'}
          className={css.linkButton}
        >
          Войти
        </Link>
      </Button>
    </>
  );
};
