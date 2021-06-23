import express, { Router } from 'express';
import httpCodes from 'http-status-codes';
import userService from '../services/userService';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const users = await userService.getAll();
  res.status(httpCodes.OK).json(users);
});

userRouter.get('/:username', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const messages = await userService.getNotes(req.body);
  res.status(httpCodes.OK).json(messages);
});

userRouter.post('/', async (req, res) => {
  const result = await userService.register(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

userRouter.put('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await userService.updateAward(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

userRouter.put('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await userService.addNotes(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

// delete user, find by username

export default userRouter;
