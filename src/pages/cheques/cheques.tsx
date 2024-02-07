import React from 'react';
import { ChequesList } from '../../widgets/chequesList';
import { NavBar } from '../../widgets/NavBar';

export const Cheques = () => {
  return (
    <>
      <NavBar pageTitle={'Чеки'} />
      <ChequesList />
    </>
  );
};
