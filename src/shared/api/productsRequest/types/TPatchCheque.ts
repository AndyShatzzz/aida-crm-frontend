export type TPatchCheque = {
  _id: string;
  productsList: {
    cheque: any;
    totalCost: number | null;
  };
  prevState: any;
};
