import express from "express";
import * as bp from "body-parser";
import { userRouter } from "./app";

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log(`App running in port : 3000`);
});
