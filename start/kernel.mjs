/* eslint-disable import/extensions */

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {dbConnect} from '../config/database.js';
import asyncErrors from '../middlewares/async.errors.middleware.js';

import routes from './routes.mjs';

const kernel = (app) => {
  dbConnect();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  routes(app);

  app.use(asyncErrors);
};

export default kernel;
