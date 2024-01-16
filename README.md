// eslint-disable-next-line no-console

const handleCounter = (productId: any) => {
if (product.length === 0) {
setProduct([{ ...productId, counter: 1 }]);
} else {
let isProductFound = false;
const updatedProducts = product.map((item: any) => {
if (item.\_id === productId.\_id) {
isProductFound = true;
return { ...item, counter: item.counter + 1 };
}
return item;
});

      if (!isProductFound) {
        setProduct([...updatedProducts, { ...productId, counter: 1 }]);
      } else {
        setProduct(updatedProducts);
      }
    }

};

const handleCounter = (productId: any) => {
const index = product.findIndex((item: any) => item.\_id === productId.\_id);

    if (index >= 0) {
      const updatedProducts = [...product];
      updatedProducts[index].counter += 1;
      setProduct(updatedProducts);
    } else {
      setProduct([...product, { ...productId, counter: 1 }]);
    }

};
