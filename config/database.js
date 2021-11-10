import { Sequelize } from 'sequelize'
import log from './logger.mjs';

// database dialect : postgres
const { DB_URI } = process.env;

const sequelize = new Sequelize(DB_URI)


const dbConnect = () => {
  (async () => {
    
    try {
      await sequelize.authenticate()
      log.info('Connection has been established successfully.')
    } catch (error) {
      log.error('Unable to connect to the database:', error)
    }

  })();
}

export {dbConnect, sequelize, Sequelize};
