export {};

import './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from '../../pages/Login/Login';
import { Registration } from '../../pages/Registration/Registration';

export const App = () => {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Registration />}
        />
      </Routes>
    </ThemeProvider>
  );
};
