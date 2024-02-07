import { UseFormRegister } from 'react-hook-form';
import { IFromValues } from './IFromValues';

export interface IFormModalInputFieldsProps {
  register: UseFormRegister<IFromValues>;
  errors: {
    image?: {
      message?: string;
    };
    productName?: {
      message?: string;
    };
    price?: {
      message?: string;
    };
    quantity?: {
      message?: string;
    };
  };
}
