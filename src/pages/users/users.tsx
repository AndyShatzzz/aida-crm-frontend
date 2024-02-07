import React from 'react';
import { NavBar } from '../../widgets/NavBar';
import { UsersList } from '../../widgets/usersList';

export const Users = () => {
  return (
    <>
      <NavBar pageTitle={'Пользователи'} />
      <UsersList />
    </>
  );
};
