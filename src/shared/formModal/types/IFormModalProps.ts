export interface IFormModalProps {
  open: boolean;
  setOpen: (params: boolean) => void;
  title: string;
  popup: string;
  buttonText: string;
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}
