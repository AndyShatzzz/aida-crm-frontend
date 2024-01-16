import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

interface IFilterDatePickerProps {
  cheques: any;
  setFilteredCheques: (params: any) => void;
}

export const FilterDatePicker: FC<IFilterDatePickerProps> = ({ cheques, setFilteredCheques }) => {
  const [date, SetDate] = useState<any | null>(dayjs(''));
  const [valueDate, setValueDate] = useState('');

  useEffect(() => {
    if (date) {
      const month = date.$M + 1 < 10 ? `0${date.$M + 1}` : `${date.$M + 1}`;
      const day = date.$D < 10 ? `0${date.$D}` : `${date.$D}`;
      setValueDate(`${date.$y}-${month}-${day}`);
    }
  }, [date]);

  const filterDateCheques = (data: any) => {
    if (data) {
      const filterCheques = data.filter((item: any) => {
        if (item.createdAt.substring(0, 10) === valueDate) {
          return item;
        }
      });
      setFilteredCheques(filterCheques);
    }
  };

  useEffect(() => {
    filterDateCheques(cheques);
  }, [valueDate]);
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
