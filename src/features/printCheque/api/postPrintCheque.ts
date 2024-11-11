import { BASE_URL } from '../../../shared/api/BaseUrlApi/BaseUrlApi';

export const printCheque = (formattedMessage: any) => {
  return fetch(`${BASE_URL}/print`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('JWT')}`
    },
    body: JSON.stringify({
      message: formattedMessage
    })
  }).then(response => response.json());
};
