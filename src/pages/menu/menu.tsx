import { NavBar } from '../../widgets/NavBar';
import { Sale } from '../../process/sale/ui/sale';

export const Menu = () => {
  return (
    <>
      <NavBar pageTitle={'Меню'} />
      <Sale />
    </>
  );
};
