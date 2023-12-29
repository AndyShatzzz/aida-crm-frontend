import { signIn } from '../Api/ApiLogin';

export const useSignin = (
  setIsSuccessAuth: (param: boolean) => void,
  setAuthMessage: (param: string) => void,
  setIsRejectedAuth: (param: boolean) => void,
  setIsSuccess: (param: boolean) => void
) =>
  async function (name: string, password: string) {
    try {
      const res = await signIn(name, password);
      if (res.status === 'error') {
        throw new Error(res.message);
      } else {
        localStorage.setItem('JWT', res.token);
        setIsSuccessAuth(true);
        setAuthMessage('Вы успешно авторизировались, пожалуйста, подождите.');
        setIsSuccess(true);
      }
    } catch (error) {
      setIsRejectedAuth(true);
      setAuthMessage('Ошибка авторизации, некорректно введено имя или пароль.');
    }
  };
