import express, { Router, Request, Response } from 'express';
// import path from 'path';
import userRouter from './userRouter';
import reimbursementRouter from './reimbursementRouter';
import userService from '../services/userService';

const baseRouter = Router();

// eslint-disable-next-line max-len
// baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
//   const { username, password } = req.body;

//   try {
//     const current = await userService.login(username, password);
//     req.session.isLoggedIn = true;

//     req.session.user = current;

//     res.json(req.session.user);
//     res.status(202).send();
//   } catch(error) {
//     res.status(401).send();
//   }
// });

async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  const user = await userService.login(username, password);

  req.session.isLoggedIn = true;
  req.session.user = user;

  res.json(req.session.user);
  res.status(202);
}

export async function logout(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }

  res.status(202).send();
}

baseRouter.post('/logout', logout);
baseRouter.post('/login', login);
baseRouter.use('/api/v1/users', userRouter);
baseRouter.use('/api/v1/reimbursements', reimbursementRouter);

export default baseRouter;
