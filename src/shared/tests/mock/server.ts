import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from '../../api/BaseUrlApi/BaseUrlApi';

export const handlers = [
  http.patch(`${BASE_URL}/api/cheques/:id/status`, req => {
    return HttpResponse.json({ success: true }, { status: 200 });
  })
];

export const server = setupServer(...handlers);
