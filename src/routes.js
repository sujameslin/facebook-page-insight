import getHome from './request-handlers/get-home';
import { getLoginCallback, getLogout } from './request-handlers/auth';
import getAnalytics from './request-handlers/get-analytics';

export default function setRoutes(app) {
  app.get('/', getHome);

  app.get('/login/callback', getLoginCallback);
  app.get('/logout', getLogout);

  app.get('/analytics', getAnalytics);
}
