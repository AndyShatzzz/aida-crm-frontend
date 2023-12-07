export {};
import React from 'react';
import Auth from '../../widgets/Auth/model/Auth';

export const Login = () => {
  return (
    <>
      <Auth
        titleText={'Авторизация'}
        buttonText={'Войти'}
        infoText={'Еще не зарегистрированы?'}
        authLink={'Регистрация'}
      />
    </>
  );
};
