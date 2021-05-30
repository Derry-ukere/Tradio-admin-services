import mysql from 'mysql';

export const autoCreateDb = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.DB_SERVER,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    connection.connect();

    console.log('Attempting to auto-create db');

    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`, err => {
      connection.end();

      if (err) {
        console.log('Unable to create database.', err.message, err.stack);
        reject(err);
      }

      resolve();
    });
  });
};
