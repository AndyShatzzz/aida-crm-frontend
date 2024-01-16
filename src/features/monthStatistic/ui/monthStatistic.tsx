import React, { useEffect, useState } from 'react';
import { Statistic } from '../../../entities/statistic/ui/statistic';
import {
  useFilterDateCheques,
  useFilterDateChequesCash,
  useFilterDateChequesCard
} from '../hooks/useFilterDateCheques';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export const MonthStatistic = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [monthSum, setMonthSum] = useState<any>([]);
  const [monthSumCash, setMonthSumCash] = useState<any>([]);
  const [monthSumCard, setMonthSumCard] = useState<any>([]);
  const [date, setDate] = useState<any>([]);

  const filterDateCheques = useFilterDateCheques(cheques);
  const sumOfFilteredChequesCash = useFilterDateChequesCash(cheques);
  const sumOfFilteredChequesCard = useFilterDateChequesCard(cheques);

  useEffect(() => {
    handleFilterDateCheques();
  }, [cheques, date]);
  const handleFilterDateCheques = () => {
    const sum = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 7;
      return filterDateCheques(item, initValue, finalValue);
    });
    setMonthSum(sum);
    const sumCash = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 7;
      return sumOfFilteredChequesCash(item, initValue, finalValue);
    });
    setMonthSumCash(sumCash);
    const sumCard = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 7;
      return sumOfFilteredChequesCard(item, initValue, finalValue);
    });
    setMonthSumCard(sumCard);
  };

  const nameMonth = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  const data = {
    labels: nameMonth,
    datasets: [
      {
        fill: true,
        label: 'Сумма',
        data: date.map((pr: any, index: any) => monthSum[index]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        fill: true,
        label: 'Наличные',
        data: date.map((pr: any, index: any) => monthSumCash[index]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      },
      {
        fill: true,
        label: 'Безналичные',
        data: date.map((pr: any, index: any) => monthSumCard[index]),
        borderColor: 'rgb(139,0,255)',
        backgroundColor: 'rgba(139,0,255, 0.5)',
        yAxisID: 'y'
      }
    ]
  };

  const years = ['2023', '2024'];

  const form = useForm({
    defaultValues: {
      year: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { isSubmitting, isDirty } = formState;

  const onSubmit = (data: any) => {
    const dateArray: string[] = [];
    for (let i = 1; i <= 12; i++) {
      dateArray.push(i < 10 ? `${data.year}-0${i}` : `${data.year}-${i}`);
    }
    setDate(dateArray);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Statistic
          data={data}
          label="месяцам"
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', width: '120px' }}
      >
        <TextField
          sx={{ mt: 2 }}
          label="Год"
          id="year"
          type="text"
          defaultValue=""
          select
          {...register('year')}
        >
          {years.map((item: any, index: any) => (
            <MenuItem
              value={years.length !== 0 ? item : ''}
              key={index}
            >
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
        >
          Применить
        </Button>
      </Box>
    </Box>
  );
};
