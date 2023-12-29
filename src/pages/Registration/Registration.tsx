export {};
import React from 'react';
import { Auth } from '../../widgets/Auth';

export const Registration = () => {
  return (
    <>
      <Auth
        titleText={'Регистрация'}
        buttonText={'Регистрация'}
        infoText={'Уже зарегистрированы?'}
        authLink={'Войти'}
        authRoute={'/signin'}
      />
    </>
  );
};
