import { ComponentType } from 'react';

type TInitialState = {
  loggedIn: boolean;
};

export interface IProtectedRouteProps {
  element: ComponentType<any>;
  loggedIn?: TInitialState;
}
