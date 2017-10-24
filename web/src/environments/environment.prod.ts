import { secret } from './secret';

export const environment = {
  production: true,
  secret: secret.prod,
  apiBaseUrl: 'http://localhost:8080'
};
