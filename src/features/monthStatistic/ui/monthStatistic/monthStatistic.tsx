import { useEffect } from 'react';
import { Statistic } from '../../../../entities/statistic/ui/statistic';
import { useFilterDateCheques } from '../../hooks/useFilterDateCheques';
import { productsRequest } from '../../../../shared/api/productsRequest/productsRequest';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { nameMonth } from '../../lib/constants/nameMonth';
import { useStatisticYearData } from '../../hooks/useStatisticYearData';
import { IFormYearStatistic } from '../../types/IFormYearStatistic';
import { InputFields } from '../inputFields/inputFields';
import { useFilterDateChequesCash } from '../../hooks/useFilterDateChequesCash';
import { useFilterDateChequesCard } from '../../hooks/useFilterDateChequesCard';
import { useStatisticYearSubmit } from '../../hooks/useStatisticYearSubmit';

export const MonthStatistic = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [date, onSubmit] = useStatisticYearSubmit();

  const [monthSum, distructSumToDays] = useFilterDateCheques(cheques || []);
  const [monthSumCash, distructSumToDaysCash] = useFilterDateChequesCash(cheques || []);
  const [monthSumCard, distructSumToDaysCard] = useFilterDateChequesCard(cheques || []);
  const statisticYearData = useStatisticYearData(nameMonth, date, monthSum, monthSumCash, monthSumCard);

  useEffect(() => {
    distructSumToDays(date);
    distructSumToDaysCash(date);
    distructSumToDaysCard(date);
  }, [cheques, date]);

  const form = useForm<IFormYearStatistic>({
    defaultValues: {
      year: `${moment(Date.now()).format('YYYY')}`
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    const year = `${moment(Date.now()).format('YYYY')}`;
    onSubmit({
      year: year
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Statistic
          data={statisticYearData}
          label="месяцам"
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', width: '120px' }}
      >
        <InputFields register={register} />
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Применить
        </Button>
      </Box>
    </Box>
  );
};
