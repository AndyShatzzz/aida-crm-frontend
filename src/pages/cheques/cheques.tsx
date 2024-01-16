import React from 'react';
import { ChequesList } from '../../widgets/chequesList/ui/chequesList';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';

export const Cheques = () => {
  return (
    <>
      <NavBar pageTitle={'Чеки'} />
      <ChequesList />
    </>
  );
};
