import moment from 'moment';

export const useGetNowDate = () => {
  const getDate = (onSubmit: ({ month, year }: { month: string; year: string }) => void) => {
    const month = `${moment(Date.now()).format('MM')}`;
    const year = `${moment(Date.now()).format('YYYY')}`;
    onSubmit({
      month: month,
      year: year
    });
  };

  return getDate;
};
