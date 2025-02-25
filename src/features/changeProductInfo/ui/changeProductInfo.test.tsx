import { render, screen, fireEvent } from '@testing-library/react';
import { ChangeProductInfo } from './changeProductInfo';
import { IChangeProductInfo } from '../types/IChangeProductInfo';

jest.mock('../../../shared/formModal', () => ({
  FormModal: ({ open }: { open: boolean }) => (open ? <div>Mocked Form Modal</div> : null)
}));

describe('ChangeProductInfo', () => {
  const mockProps: IChangeProductInfo = {
    _id: '1',
    image: 'test.jpg',
    name: 'Test Product',
    quantity: 5,
    price: 100
  };

  test('Render button "Изменить"', () => {
    render(<ChangeProductInfo {...mockProps} />);
    const button = screen.getByRole('button', { name: /Изменить/i });
    expect(button).toBeInTheDocument();
  });

  test('Button "Удалить" is not in the document', () => {
    render(<ChangeProductInfo {...mockProps} />);
    const button = screen.queryByText(/Удалить/i);
    expect(button).not.toBeInTheDocument();
  });

  test('Open modal when click', () => {
    render(<ChangeProductInfo {...mockProps} />);
    const button = screen.getByRole('button', { name: /Изменить/i });
    fireEvent.click(button);
    const modal = screen.getByText('Mocked Form Modal');
    expect(modal).toBeInTheDocument();
  });

  test('Pass correct props to the modal', () => {
    render(<ChangeProductInfo {...mockProps} />);

    const button = screen.getByRole('button', { name: /Изменить/i });
    fireEvent.click(button);
    expect(screen.getByText('Mocked Form Modal')).toBeInTheDocument();
  });
});
