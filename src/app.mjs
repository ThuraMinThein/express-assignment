import express from "express";
import userRouter from "./routers/userRouter.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(userRouter);

app.listen(PORT, (res, req) => {
  console.log(`server is running on port: ${PORT}`);
});
