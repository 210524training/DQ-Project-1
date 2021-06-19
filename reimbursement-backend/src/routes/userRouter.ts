import express, { Router } from 'express';
import userRepo from '../repositories/userRepo';
import User from '../models/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('Reached our user router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }

  res.json(await userRepo.getAll());
});

userRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(await userRepo.findByUsername(username));
});

userRouter.post(
  '/',
  async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
    res.json(await userRepo.attemptRegister(req.body));
  },
);

export default userRouter;
