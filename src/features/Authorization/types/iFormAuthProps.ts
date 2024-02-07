export interface iFormAuthProps {
  buttonText: string;
  infoText: string;
  authLink: string;
  authRoute: string;
  setIsSuccessAuth: (params: boolean) => void;
  setAuthMessage: (params: string) => void;
  setIsRejectedAuth: (params: boolean) => void;
}
