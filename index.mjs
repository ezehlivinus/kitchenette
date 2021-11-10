/* eslint-disable import/extensions */
import express from 'express';
import 'express-async-errors';
import log from './config/logger.mjs';
import start from './start/kernel.mjs';

const app = express();
start(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log.info(`Listening on port ${port}`);
});
