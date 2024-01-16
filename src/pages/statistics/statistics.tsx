import React from 'react';
import { NavBar } from '../../widgets/NavBar/ui/navBar/navBar';
import { StatisticsList } from '../../widgets/statisticsList/ui/statisticsList';

export const Statistics = () => {
  return (
    <>
      <NavBar pageTitle="Статистика" />
      <StatisticsList />
    </>
  );
};
