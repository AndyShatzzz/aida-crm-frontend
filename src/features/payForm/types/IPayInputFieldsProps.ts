import { UseFormRegister } from 'react-hook-form';
import { IFormInitialState } from './IFormInitialState';

export interface IPayInputFieldsProps {
  totalCost: number | null;
  register: UseFormRegister<IFormInitialState>;
  errors: {
    card?: {
      message?: string;
    };
    cash?: {
      message?: string;
    };
  };
}
