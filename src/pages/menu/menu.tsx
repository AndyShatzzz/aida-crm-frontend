import React from 'react';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';
import { TableList } from '../../widgets/tableList/ui/tableList';
import { Sale } from '../../process/sale/ui/sale';

export const Menu = () => {
  return (
    <>
      <NavBar pageTitle={'Меню'} />
      <Sale />
    </>
  );
};
