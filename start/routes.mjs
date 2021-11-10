/* eslint-disable import/extensions */
import usersRoutes from '../routes/users.route.js';

export default (app) => {
  const baseRoute = '/api/v1';
  app.use(`${baseRoute}/users`, usersRoutes);
};
