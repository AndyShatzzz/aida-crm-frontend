import { Skeleton } from '@mui/material';

export const UserWidgetSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="circular"
        animation="wave"
        sx={{ width: '32px', height: '32px' }}
      ></Skeleton>
      <Skeleton
        variant="text"
        animation="wave"
        sx={{ width: '37px', height: '32px', marginLeft: '8px' }}
      ></Skeleton>
    </>
  );
};
