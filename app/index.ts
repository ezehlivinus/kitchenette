import { PrismaClient } from '@prisma/client'
import express from 'express';
import 'express-async-errors';
import asyncErrorsMiddleware from './middlewares/async.errors.middleware';
// import log from './config/logger.mjs';
// import start from './start/kernel.mjs';
import userRoutes from './routes/user.route';
import menuRoutes from './routes/menu.route';
import restaurantRoutes from './routes/restaurant.route';
import Auth from './middlewares/authentication.middleware'


const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes)

app.use('/api/v1/restaurants',
  // middleware
  [Auth.authenticate],
  // handlers
  [restaurantRoutes, menuRoutes]
)

app.use(asyncErrorsMiddleware)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

const prisma = new PrismaClient()
