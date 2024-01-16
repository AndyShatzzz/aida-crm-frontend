import { useState, useCallback } from 'react';
import { InitialProducts, Product } from '../types/saleCreatingType';

const useProductCounter = (initialProducts: InitialProducts = []) => {
  const [products, setProducts] = useState<InitialProducts>(initialProducts);

  const handleCounter = useCallback(
    (selectedProduct: Product) => {
      const index = products.findIndex(item => item.productId === selectedProduct.productId);
      if (index >= 0) {
        const updatedProducts = structuredClone([...products]);
        updatedProducts[index].counter = (updatedProducts[index].counter || 0) + 1;
        updatedProducts[index].cost = updatedProducts[index].counter * updatedProducts[index].price;
        setProducts(updatedProducts);
      } else {
        setProducts([...products, { ...selectedProduct, counter: 1 }]);
      }
    },
    [products]
  );

  return [products, handleCounter, setProducts] as const;
};

export default useProductCounter;
