import React from 'react';
import { ProductsList } from '../../widgets/productsList';
import { NavBar } from '../../widgets/NavBar';

export const Products = () => {
  return (
    <>
      <NavBar pageTitle={'Продукты'} />
      <ProductsList />
    </>
  );
};
