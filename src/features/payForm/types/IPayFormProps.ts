export interface IPayFormProps {
  isPayModalOpen: boolean;
  setIsPayModalOpen: (params: boolean) => void;
  totalCost: number | null;
  handlePayCheque: (cash: number, card: number) => Promise<void>;
}
