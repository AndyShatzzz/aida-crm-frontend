import React, { useEffect, useState } from 'react';
import { Statistic } from '../../../entities/statistic/ui/statistic';
import {
  useFilterDateCheques,
  useFilterDateChequesCash,
  useFilterDateChequesCard
} from '../hooks/useFilterDateCheques';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

export const DayStatistic = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [daySum, setDaySum] = useState<any>([]);
  const [daySumCash, setDaySumCash] = useState<any>([]);
  const [daySumCard, setDaySumCard] = useState<any>([]);
  const [date, setDate] = useState<any>([]);

  const sumOfFilteredCheques = useFilterDateCheques(cheques);
  const sumOfFilteredChequesCash = useFilterDateChequesCash(cheques);
  const sumOfFilteredChequesCard = useFilterDateChequesCard(cheques);

  useEffect(() => {
    handleFilterDateCheques();
  }, [cheques, date]);
  const handleFilterDateCheques = () => {
    const sum = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 10;
      return sumOfFilteredCheques(item, initValue, finalValue);
    });
    setDaySum(sum);
    const sumCash = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 10;
      return sumOfFilteredChequesCash(item, initValue, finalValue);
    });
    setDaySumCash(sumCash);
    const sumCard = date.map((item: any) => {
      const initValue = 0;
      const finalValue = 10;
      return sumOfFilteredChequesCard(item, initValue, finalValue);
    });
    setDaySumCard(sumCard);
  };

  const nameMonth = [
    {
      name: 'Январь',
      value: '01'
    },
    {
      name: 'Февраль',
      value: '02'
    },
    {
      name: 'Март',
      value: '03'
    },
    {
      name: 'Апрель',
      value: '04'
    },
    {
      name: 'Май',
      value: '05'
    },
    {
      name: 'Июнь',
      value: '06'
    },
    {
      name: 'Июль',
      value: '07'
    },

    {
      name: 'Август',
      value: '08'
    },
    {
      name: 'Сентябрь',
      value: '09'
    },
    {
      name: 'Октябрь',
      value: '10'
    },
    {
      name: 'Ноябрь',
      value: '11'
    },
    {
      name: 'Декабрь',
      value: '12'
    }
  ];

  const years = ['2023', '2024'];

  const data = {
    labels: date,
    datasets: [
      {
        fill: true,
        label: 'Сумма',
        data: date.map((pr: any, index: any) => daySum[index]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        fill: true,
        label: 'Наличные',
        data: date.map((pr: any, index: any) => daySumCash[index]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      },
      {
        fill: true,
        label: 'Безналичные',
        data: date.map((pr: any, index: any) => daySumCard[index]),
        borderColor: 'rgb(139,0,255)',
        backgroundColor: 'rgba(139,0,255, 0.5)',
        yAxisID: 'y'
      }
    ]
  };

  interface IForm {
    month: string;
    year: string;
  }

  const form = useForm<IForm>({
    defaultValues: {
      month: '',
      year: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { isSubmitting, isDirty } = formState;

  const onSubmit = (data: any) => {
    const dateArray: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateArray.push(i < 10 ? `${data.year}-${data.month}-0${i}` : `${data.year}-${data.month}-${i}`);
    }
    setDate(dateArray);
  };

  const [max, setMax] = useState<number | null>(null);
  const [min, setMin] = useState<number | null>(null);
  const [middle, setMiddle] = useState<number | null>(null);

  useEffect(() => {
    const a = daySum.map(Number);
    if (a.length !== 0) {
      const max = a.reduce((a: any, b: any) => {
        if (a > b) {
          return a;
        } else {
          return b;
        }
      }, -Infinity);
      setMax(max);

      const min = a.reduce((a: any, b: any) => {
        if (a > b) {
          return b;
        } else {
          return a;
        }
      }, +Infinity);
      setMin(min);

      const middle = a.reduce((a: any, b: any) => {
        return a + b;
      }, 0);
      setMiddle(Math.floor(middle / a.length));
    }
  }, [daySum]);

  return (
    <Box>
      <Grid container>
        <Grid
          item
          sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center', mr: 2 }}
        >
          <Typography variant="body2">Максимальная выручка</Typography>
          {max && <Typography>{max}</Typography>}
        </Grid>
        <Grid
          item
          sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center', mr: 2 }}
        >
          <Typography variant="body2">Минимальная выручка</Typography>
          {min && <Typography>{min}</Typography>}
        </Grid>
        <Grid
          item
          sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center' }}
        >
          <Typography variant="body2">Средняя выручка</Typography>
          {middle && <Typography>{middle}</Typography>}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Statistic
            data={data}
            label="дням"
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', width: '120px' }}
        >
          <TextField
            sx={{ mt: 2 }}
            label="Месяц"
            id="month"
            type="text"
            defaultValue=""
            select
            {...register('month')}
          >
            {nameMonth.map((item: any, index: any) => (
              <MenuItem
                value={nameMonth.length !== 0 ? item.value : ''}
                key={index}
              >
                {item.name}
              </MenuItem>
            ))}
          </TextField>
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
    </Box>
  );
};
