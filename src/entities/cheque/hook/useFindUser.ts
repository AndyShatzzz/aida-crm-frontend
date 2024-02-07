import { useState } from 'react';
import { IUsers } from '../../../shared/types/IUsers';

export const useFindUser = (users: IUsers[]) => {
  const [userName, setUserName] = useState('');

  const findUser = (id: string) => {
    users?.find((user: IUsers) => {
      if (user._id === id) {
        setUserName(user.name);
      }
    });
  };

  return [userName, findUser] as const;
};
