import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Login } from '../pages/Login/Login';
import { Registration } from '../pages/Registration/Registration';
import { defaultTheme } from '../shared/theme/defaultTheme';
import { Users } from '../pages/users/users';
import { ProtectedRoute } from '../features/protectedRoute';
import { useEffect } from 'react';
import { useAppDispatch, UseAppSelector } from '../shared/hooks/useAppDispatch';
import { setTrue, setFalse } from '../features/checkToken/config/initLoggedInSlice';
import { Products } from '../pages/products/products';
import { Home } from '../pages/home/home';
import { Menu } from '../pages/menu/menu';
import { Cheques } from '../pages/cheques/cheques';
import { Settings } from '../pages/settings/settings';
import { Statistics } from '../pages/statistics/statistics';
import './App.module.scss';

export const App = () => {
  const initLoggedIn = UseAppSelector(state => state.initLoggedInSlice.loggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('JWT')) {
      dispatch(setTrue());
    } else {
      dispatch(setFalse());
    }
  }, [localStorage.getItem('JWT')]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route
          path="/signin"
          element={
            initLoggedIn ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            initLoggedIn ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path="/"
          element={<Home />}
        />
        {/* <Route
          path="/"
          element={<ProtectedRoute element={Home} />}
        /> */}
        <Route
          path="/users"
          element={<ProtectedRoute element={Users} />}
        />
        <Route
          path="/products"
          element={<ProtectedRoute element={Products} />}
        />
        <Route
          path="/menu"
          element={<ProtectedRoute element={Menu} />}
        />
        <Route
          path="/cheques"
          element={<ProtectedRoute element={Cheques} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={Settings} />}
        />
        <Route
          path="/statistics"
          element={<ProtectedRoute element={Statistics} />}
        />
      </Routes>
    </ThemeProvider>
  );
};
