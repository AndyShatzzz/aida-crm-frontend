import { ChangeNumOfTable } from '../../features/changeNumOfTable/ui/changeNumOfTable';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';

export const Settings = () => {
  return (
    <>
      <NavBar pageTitle="Настройки" />
      <ChangeNumOfTable />
    </>
  );
};
