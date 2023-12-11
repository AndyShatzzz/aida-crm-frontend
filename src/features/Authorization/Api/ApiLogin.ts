import { BASE_URL } from '../../../shared/BaseUrlApi/ApiHeaders';

export const signIn = (name: string, password: string) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      password: password
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
