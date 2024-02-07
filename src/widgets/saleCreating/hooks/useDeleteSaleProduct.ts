import { InitialProducts, Product } from '../types/saleCreatingType';

export const useDeleteSaleProduct = (products: InitialProducts, setProducts: (params: InitialProducts) => void) => {
  const handleDeleteProduct = (prod: Product) => {
    const newProductsList = products.filter((item: Product) => item.productId !== prod.productId);
    setProducts(newProductsList);
  };
  return handleDeleteProduct;
};
