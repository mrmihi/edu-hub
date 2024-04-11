import mongoose from 'mongoose';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Mongoose-Connector');

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      keepAlive: true,
      socketTimeoutMS: 30000,
    });
    logger.info(`Connected to database successfully`);
  } catch (err) {
    logger.error(`Failed to connect to the database | message: ${err.message}`);
  }

  mongoose.connection.on('error', (err) => logger.error(`Database error - message: ${err.message} - error: ${err.message}`));

  mongoose.connection.on('disconnected', () => logger.error(`Database disconnected`));

  mongoose.connection.on('reconnected', () => logger.info(`Database reconnected`));

  process.on('exit', () => mongoose.disconnect());
};

export const aggregatePopulate = (...attributes) =>
  attributes.reduce((acc, attr) => {
    acc = [
      ...acc,
      {
        $lookup: {
          from: attr[0],
          localField: attr[1],
          foreignField: '_id',
          as: attr[1],
        },
      },
    ];
    // the third attribute is a boolean which when provided indicates that the field is originally an array and shouldn't be unwinded
    if (!attr[2]) {
      acc.push({ $unwind: `$${attr[1]}` });
    }
    return acc;
  }, []);
