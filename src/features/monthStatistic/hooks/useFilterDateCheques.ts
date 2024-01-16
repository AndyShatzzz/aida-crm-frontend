export const useFilterDateCheques = (cheques: any) =>
  function (month: string, initValue: number, finalValue: number) {
    if (cheques) {
      const filterCheques = cheques.filter((item: any) => {
        if (item.createdAt.substring(initValue, finalValue) === month && item.status === false) {
          return item;
        }
      });
      const sumOfFilteredCheques = filterCheques.reduce((prVal: any, item: any) => {
        return prVal + item.productsList.totalCost;
      }, 0);
      return sumOfFilteredCheques;
    }
  };

export const useFilterDateChequesCash = (cheques: any) =>
  function (month: string, initValue: number, finalValue: number) {
    if (cheques) {
      const filterCheques = cheques.filter((item: any) => {
        if (item.createdAt.substring(initValue, finalValue) === month && item.status === false) {
          return item;
        }
      });
      const sumOfFilteredCheques = filterCheques.reduce((prVal: any, item: any) => {
        return prVal + item.productsList.cash;
      }, 0);
      return sumOfFilteredCheques;
    }
  };
export const useFilterDateChequesCard = (cheques: any) =>
  function (month: string, initValue: number, finalValue: number) {
    if (cheques) {
      const filterCheques = cheques.filter((item: any) => {
        if (item.createdAt.substring(initValue, finalValue) === month && item.status === false) {
          return item;
        }
      });
      const sumOfFilteredCheques = filterCheques.reduce((prVal: any, item: any) => {
        return prVal + item.productsList.card;
      }, 0);
      return sumOfFilteredCheques;
    }
  };
