import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';
import log from './log';
import baseRouter from './routes/userRouter';

dotenv.config({});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.WEB_CLIENT_ORIGIN || 'http://localhost:3001'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, './public')));
app.use(
  expressSession({
    secret: 'whatever-probably-should-be-from-env-vars',
    cookie: {},
  }),
);

app.use('/', baseRouter);

const { BAD_REQUEST } = StatusCodes;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error(err);
  res.status(BAD_REQUEST).json({
    error: err.message,
  });

  next(err);
});

export default app;
