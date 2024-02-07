import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { IFilterDatePickerProps } from '../types/IFilterDatePickerProps';
import { useFilterDateCheques } from '../hooks/useFilterDateCheques';

export const FilterDatePicker: FC<IFilterDatePickerProps> = ({ cheques, setFilteredCheques }) => {
  const [date, SetDate] = useState<Dayjs | null>(dayjs(''));
  const [valueDate, setValueDate] = useState('');
  const filterDateCheques = useFilterDateCheques();

  useEffect(() => {
    SetDate(dayjs(`${moment(Date.now()).format('YYYY/MM/DD')}`));
  }, []);

  useEffect(() => {
    if (date) {
      setValueDate(dayjs(date).format('YYYY-MM-DD'));
    }
  }, [date]);

  useEffect(() => {
    filterDateCheques(cheques, setFilteredCheques, valueDate);
  }, [valueDate, cheques]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выберите дату"
          disableFuture
          sx={{ mb: 2 }}
          value={date}
          onChange={newValue => SetDate(newValue)}
        />
      </LocalizationProvider>
    </>
  );
};
