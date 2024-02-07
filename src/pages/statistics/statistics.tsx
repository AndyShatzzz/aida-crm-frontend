import React from 'react';
import { NavBar } from '../../widgets/NavBar';
import { StatisticsList } from '../../widgets/statisticsList';

export const Statistics = () => {
  return (
    <>
      <NavBar pageTitle="Статистика" />
      <StatisticsList />
    </>
  );
};
