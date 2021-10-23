import { connect, Mongoose } from 'mongoose';

export default class DbConnection {
  public static async connect(): Promise<Mongoose> {
    const dbConnect: string = process.env.DB_CONNECT || '';
    return connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}
