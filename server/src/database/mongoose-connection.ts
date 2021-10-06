import * as mongoose from 'mongoose';

export interface IConnectionProperties {
  databaseUrl: string;
  databaseName: string;
}

export class MongooseConnection {
  constructor(readonly config: IConnectionProperties) {}

  public async connect() {
    console.log('Connecting to the database ...');
    await mongoose.connect(this.config.databaseUrl, { dbName: this.config.databaseName });
    console.log('Database connected...');
  }

  public disconnect() {
    mongoose.disconnect();
    console.log('Database disconnected...');
  }
}
