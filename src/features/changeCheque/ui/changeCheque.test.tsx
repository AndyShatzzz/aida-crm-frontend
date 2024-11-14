import { render, screen } from '@testing-library/react';
import { ChangeCheque } from './changeCheque';
import { IChangeCheque } from '../types/IChangeCheque';
import { configureStore } from '@reduxjs/toolkit';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { Provider } from 'react-redux';

jest.mock('../../../shared/api/productsRequest/productsRequest', () => ({
  productsRequest: {
    usePatchChequeStatusMutation: jest
      .fn()
      .mockReturnValue([jest.fn(), { isLoading: false, isError: false, data: null, error: null }])
  }
}));

const mockStore = configureStore({
  reducer: {
    [productsRequest.reducerPath]: productsRequest.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsRequest.middleware)
});

describe('ChangeCheque', () => {
  const mockProps: IChangeCheque = {
    chequeProps: {
      createdAt: '11111111111',
      owner: 'Andy',
      _id: 'e2e2e2',
      prevState: [],
      productsList: {
        card: 0,
        cash: 0,
        totalCost: null,
        cheque: [
          {
            name: 'coca-cola',
            counter: 1,
            cost: 130,
            price: 130,
            productId: 'e2er45ght65',
            _id: 'rrr12'
          }
        ]
      },
      status: 'closed',
      tableNumber: 1
    },
    expanded: 'false',
    setExpanded: jest.fn()
  };

  test('Render button "Удалить"', () => {
    render(
      <Provider store={mockStore}>
        <ChangeCheque {...mockProps} />
      </Provider>
    );
    const button = screen.getByRole('button', { name: /Удалить/i });
    expect(button).toBeInTheDocument();
  });
});
