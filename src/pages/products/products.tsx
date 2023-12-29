import React from 'react';
import { ProductsList } from '../../widgets/productsList/ui/productsList';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';

export const Products = () => {
  return (
    <>
      <NavBar pageTitle={'Продукты'} />
      <ProductsList />
    </>
  );
};
