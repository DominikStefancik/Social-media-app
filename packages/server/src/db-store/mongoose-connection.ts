import * as mongoose from 'mongoose';
import * as pino from 'pino';

export interface IConnectionProperties {
  databaseUrl: string;
  databaseName: string;
}

export class MongooseConnection {
  constructor(
    private readonly config: IConnectionProperties,
    private readonly logger: pino.Logger
  ) {}

  public async connect() {
    this.logger.info('Connecting to the database...');
    await mongoose.connect(this.config.databaseUrl, { dbName: this.config.databaseName });
    this.logger.info('Database connected.');
  }

  public async disconnect() {
    await mongoose.disconnect();
    this.logger.info('Database disconnected.');
  }
}
