import { IPatchUserRequest } from '../api/patchUserRequist';
import { IInitialState } from '../types/IInitialState';

export const useChangeUserInfoSubmit = (
  patchUsers: (data: IPatchUserRequest) => void,
  setOpen: (params: boolean) => void,
  _id: string,
  avatar: string,
  name: string,
  role: string
) => {
  const onSubmit = (data: IInitialState) => {
    patchUsers({
      _id: _id,
      avatar: data.avatar || avatar,
      name: data.name || name,
      role: data.role || role
    });
    setOpen(false);
  };

  return onSubmit;
};
