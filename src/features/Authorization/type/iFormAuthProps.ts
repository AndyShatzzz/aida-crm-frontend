import { Dispatch, SetStateAction } from 'react';

export interface iFormAuthProps {
  buttonText: string;
  infoText: string;
  authLink: string;
  authRoute: string;
  setIsSuccessAuth: Dispatch<SetStateAction<boolean>>;
  setAuthMessage: Dispatch<SetStateAction<string>>;
  setIsRejectedAuth: Dispatch<SetStateAction<boolean>>;
}
