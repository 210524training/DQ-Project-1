import {
  Router, Request, Response,
} from 'express';
import userService from '../services/userService';
import log from '../log';
import User from '../models/user';

const userRouter = Router({ mergeParams: true });

// eslint-disable-next-line max-len
export async function postUser(req: Request<unknown, unknown, User, object>, res: Response): Promise<void> {
  log.info('Request to create a user');
  const user = req.body;

  const result = await userService.register(user);
  if(!result) {
    res.status(500).send();
  } else {
    res.status(201).send();
  }
}

export async function putAward(req: Request, res: Response): Promise<void> {
  log.info('Request to post amount awarded');
  const reimbursement = req.body;

  const result = await userService.updateAward(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(201);
  }
}

userRouter.post('/register', postUser);
userRouter.put('/update', putAward);

export default userRouter;
