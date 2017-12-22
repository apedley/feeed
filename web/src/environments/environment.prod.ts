import { secret } from './secret';

export const environment = {
  production: true,
  secret: secret.prod,
  apiBaseUrl: 'http://feeed.online:9578'
};
