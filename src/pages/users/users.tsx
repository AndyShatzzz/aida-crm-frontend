import React from 'react';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';
import { UsersList } from '../../widgets/usersList/ui/usersList';

export const Users = () => {
  return (
    <>
      <NavBar pageTitle={'Пользователи'} />
      <UsersList />
    </>
  );
};
