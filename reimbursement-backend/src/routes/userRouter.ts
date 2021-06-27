import {
  Router, Request, Response,
} from 'express';
import userService from '../services/userService';
import log from '../log';
import User from '../models/user';

const userRouter = Router({ mergeParams: true });

// eslint-disable-next-line max-len
export async function postUser(req: Request<unknown, unknown, User, object>, res: Response): Promise<void> {
  const user = req.body;

  const result = await userService.register(user);
  if(!result) {
    res.status(500).send();
  } else {
    res.status(201).send();
  }
}

userRouter.get('/:username', async (req: Request, res: Response) => {
  try {
    console.log('inside reimbursement routes');

    res.json(
      await userService.findUser(req.params.username),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// export async function findUser(req: Request, res: Response): Promise<void> {
//   const { username } = req.params;

//   res.json(
//     await userService.findUser(username),
//   );
// }

export async function putAward(req: Request, res: Response): Promise<void> {
  console.log('inside put award user route');
  const user = req.body;
  console.log(user);

  const result = await userService.addAward(user);
  if(!result) {
    res.status(500);
  } else {
    res.status(201);
  }
}

userRouter.post('/register', postUser);
userRouter.put('/update', putAward);
// userRouter.get('/:user', findUser);
export default userRouter;
