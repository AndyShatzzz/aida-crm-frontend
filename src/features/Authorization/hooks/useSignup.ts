import { signup } from '../Api/ApiRegister';

export const useSignup = (
  setIsSuccessAuth: (param: boolean) => void,
  setAuthMessage: (param: string) => void,
  setIsRejectedAuth: (param: boolean) => void,
  setIsSuccessRegister: (param: boolean) => void
) =>
  async function (name: string, password: string) {
    try {
      const res = await signup(name, password);
      if (res.status === 'error') {
        throw new Error(res.message);
      } else {
        setIsSuccessAuth(true);
        setAuthMessage('Вы успешно зарегистрировались, пожалуйста, подождите идет авторизация');
        setIsSuccessRegister(true);
      }
    } catch (error) {
      setIsRejectedAuth(true);
      setAuthMessage('Ошибка регистрации, попробуйте изменить имя или пароль и попробуйте снова');
    }
  };
