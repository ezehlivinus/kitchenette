import { PrismaClient } from '@prisma/client'
import express from 'express';
import 'express-async-errors';
import asyncErrorsMiddleware from './middlewares/async.errors.middleware';
// import log from './config/logger.mjs';
// import start from './start/kernel.mjs';
import userRoutes from './routes/user.route';
import restaurantRoutes from './routes/restaurant.route';

const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/restaurants', restaurantRoutes)
app.use(asyncErrorsMiddleware)
// start(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

const prisma = new PrismaClient()




