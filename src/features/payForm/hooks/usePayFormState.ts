import { useForm } from 'react-hook-form';
import { IFormInitialState } from '../types/IFormInitialState';

export const usePayFormState = () => {
  const form = useForm<IFormInitialState>({
    defaultValues: {
      cash: 0,
      card: 0
    },
    mode: 'onChange'
  });
  return form;
};
