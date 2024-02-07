import { BASE_URL } from '../../../shared/api/BaseUrlApi/BaseUrlApi';

export interface IPatchUserRequest {
  _id: string;
  avatar?: string;
  name?: string;
  role?: string;
}

export const patchUserRequest = ({ _id, avatar, name, role }: IPatchUserRequest) => {
  return fetch(`${BASE_URL}/users/${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('JWT')}`
    },
    body: JSON.stringify({
      avatar: avatar,
      name: name,
      role: role
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return res.json();
    }
  });
};
