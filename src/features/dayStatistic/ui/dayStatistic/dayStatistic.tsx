import { useEffect } from 'react';
import { Statistic } from '../../../../entities/statistic/ui/statistic';
import { useFilterDateCheques } from '../../hooks/useFilterDateCheques';
import { productsRequest } from '../../../../shared/api/productsRequest/productsRequest';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { IForm } from '../../types/IForm';
import { useStatisticData } from '../../hooks/useStatisticData';
import { useSetMinMaxMiddleValues } from '../../hooks/useSetMinMaxMiddleValues';
import { useSetDateSubmit } from '../../hooks/useSetDateSubmit';
import { useGetNowDate } from '../../hooks/useGetNowDate';
import { useFilterDateChequesCash } from '../../hooks/useFilterDateChequesCash';
import { useFilterDateChequesCard } from '../../hooks/useFilterDateChequesCard';
import { MinMaxMiddleStatistic } from '../minMaxMiddleStatistic/minMaxMiddleStatistic';
import { InputFields } from '../inputFields/inputFields';

export const DayStatistic = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [date, onSubmit] = useSetDateSubmit();

  const [daySum, distructSumToDays] = useFilterDateCheques(cheques || []);
  const [daySumCash, distructSumToDaysCash] = useFilterDateChequesCash(cheques || []);
  const [daySumCard, distructSumToDaysCard] = useFilterDateChequesCard(cheques || []);

  const data = useStatisticData(date, daySum, daySumCash, daySumCard);
  const [max, min, middle] = useSetMinMaxMiddleValues(daySum);
  const getNowDate = useGetNowDate();
  useEffect(() => {
    getNowDate(onSubmit);
  }, []);

  useEffect(() => {
    distructSumToDays(date);
    distructSumToDaysCash(date);
    distructSumToDaysCard(date);
  }, [cheques, date]);

  const form = useForm<IForm>({
    defaultValues: {
      month: `${moment(Date.now()).format('MM')}`,
      year: `${moment(Date.now()).format('YYYY')}`
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  return (
    <Box>
      <MinMaxMiddleStatistic
        min={min}
        max={max}
        middle={middle}
      />
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
          <InputFields register={register} />
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            Применить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
