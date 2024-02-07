import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { IProtectedRouteProps } from '../types/IProtectedRouteProps';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ element: Component, loggedIn }) => {
  const jwt = localStorage.getItem('JWT');
  return loggedIn || jwt ? (
    <Component {...loggedIn} />
  ) : (
    <Navigate
      to="/signin"
      replace
    />
  );
};
