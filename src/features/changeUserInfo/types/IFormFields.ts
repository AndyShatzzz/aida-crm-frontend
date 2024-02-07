import { UseFormRegister } from 'react-hook-form';
import { IInitialState } from './IInitialState';

export interface IFormFields {
  register: UseFormRegister<IInitialState>;
  errors: {
    avatar?: {
      message?: string;
    };
    name?: {
      message?: string;
    };
    role?: {
      message?: string;
    };
  };
  role: string;
}
