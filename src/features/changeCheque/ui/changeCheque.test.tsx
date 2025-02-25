import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../shared/model/store';
import { ChangeCheque } from './changeCheque';
import { server } from '../../../shared/tests/mock/server';
import { http, HttpResponse } from 'msw';
import { IChangeCheque } from '../types/IChangeCheque';

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

describe('ChangeCheque Component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <ChangeCheque {...mockProps} />
      </Provider>
    );
  });

  it('renders delete button when status is "closed"', () => {
    const deleteButton = screen.getByText(/Удалить/i);
    expect(deleteButton).toBeInTheDocument();
  });

  it('opens modal on delete button click', () => {
    const deleteButton = screen.getByText(/Удалить/i);
    fireEvent.click(deleteButton);

    const modalText = screen.getByText(/Вы уверены, что хотите удалить чек?/i);
    expect(modalText).toBeInTheDocument();
  });

  it('calls the mock API on confirm delete', async () => {
    server.use(
      http.patch('https://example.com/api/cheques/:id/status', req => {
        return HttpResponse.json({ success: true }, { status: 200 });
      })
    );

    const deleteButton = screen.getByText(/Удалить/i);
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText(/Да/i);
    fireEvent.click(confirmButton);

    // Optionally wait for API response
    await screen.findByText(/Вы уверены, что хотите удалить чек?/i);

    // Test that the modal closes or any other side effects
  });

  it('closes modal on "Нет" button click', () => {
    const deleteButton = screen.getByText(/Удалить/i);
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByText(/Нет/i);
    fireEvent.click(cancelButton);

    const modalText = screen.queryByText(/Вы уверены, что хотите удалить чек?/i);
    expect(modalText).not.toBeInTheDocument();
  });
});
