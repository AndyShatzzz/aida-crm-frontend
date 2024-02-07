import { useForm } from 'react-hook-form';
import { IFromValues } from '../types/IFromValues';

export const useModalFormState = (price: number, name: string) => {
  const form = useForm<IFromValues>({
    defaultValues: {
      image: '',
      productName: name || '',
      quantity: 0,
      price: price || 0
    },
    mode: 'onChange'
  });
  return form;
};
