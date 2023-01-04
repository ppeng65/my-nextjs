import 'reflect-metadata';
import { Connection, getConnection, createConnection } from 'typeorm';
import { User } from './entity';

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: database,
} = process.env;

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }

      const connection = await createConnection({
        type: 'mysql',
        host,
        port: Number(port),
        username,
        password,
        database,
        entities: [User],
        synchronize: false,
        logging: true,
      });

      return connection;
    })();
  }

  return connectionReadyPromise;
};
