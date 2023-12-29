import { BASE_URL } from '../../../shared/api/BaseUrlApi/BaseUrlApi';

export const signIn = (token: string) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
