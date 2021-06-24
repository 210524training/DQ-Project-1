import express, {
  Router, Request, Response,
} from 'express';
import userService from '../services/userService';
import log from '../log';

const userRouter = Router({ mergeParams: true });

export async function postUser(req: Request, res: Response): Promise<void> {
  log.info('Request to create a user');
  const { user } = req.body;

  const result = await userService.register(user);
  if(!result) {
    res.status(500);
  } else {
    res.status(201);
  }
}

export async function putAward(req: Request, res: Response): Promise<void> {
  log.info('Request to post amount awarded');
  const { reimbursement } = req.body;

  const result = await userService.updateAward(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(201);
  }
}

userRouter.post('/register', postUser);
userRouter.put('/reimbursement/accept', putAward);

export default userRouter;
