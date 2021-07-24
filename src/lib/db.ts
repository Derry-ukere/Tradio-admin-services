import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {Logger} from '../helpers/Logger';

dotenv.config();

const connectDB = async ( ) => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Derry:Mudiaga1256@cluster0.ukkdz.mongodb.net/mySecondDatabase?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    Logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    Logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
