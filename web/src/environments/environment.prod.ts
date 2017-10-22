import { secret } from './secret';

export const environment = {
  production: true,
  secret: secret.dev,
  apiBaseUrl: 'http://localhost:8080'
};
