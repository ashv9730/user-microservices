
import mongoose from 'mongoose';
import { dbClusterName, dbName, dbPassword, dbUser } from "../env";


export const DBConn = async () => {
  const dbUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterName}/${dbName}?retryWrites=true&w=majority`;
  
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB Connected successfully");
  });
};
