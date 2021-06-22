import express, { Router } from 'express';
import httpCodes from 'http-status-codes';
import User from '../models/user';
import userService from '../services/userService';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const users = await userService.getAll();
  res.status(httpCodes.OK).json(users);
});

userRouter.post('/', async (req, res) => {
  const result = await userService.register(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

// delete user, find by username

export default userRouter;
