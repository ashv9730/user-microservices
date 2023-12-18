import express from "express";
import { DBConn } from "./db/dbConn";
import userRouter from "./routes";

const app = express();
// DB connection
DBConn();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/',(req,res) => {
  res.send('hello from users ')
})
app.use("/user", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
