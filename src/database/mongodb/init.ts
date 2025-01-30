import mongoose from "mongoose";


interface ConnectionDataBase {
  mongoUrl: string;
  dbName: string;
}
export class MongoDataBase {
  static async connect(options: ConnectionDataBase) {
    const { mongoUrl, dbName } = options;


    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log('Mongo connected');
    } catch (error) {
      console.log("Connection to Mongo has failed");
      throw error;
    }
  }
}
