import express, { Router, Request, Response } from 'express';
// import path from 'path';
import fs from 'fs';
import util from 'util';
import multer from 'multer';
import userRouter from './userRouter';
import reimbursementRouter from './reimbursementRouter';
import userService from '../services/userService';
import messageRouter from './messageRouter';
import uploadFile, { getFileStream } from '../services/s3';

const baseRouter = Router();

const upload = multer({ dest: 'upload/' });

const unlinkFile = util.promisify(fs.unlink);

baseRouter.get('/images/:key', (req, res) => {
  const { key } = req.params;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

baseRouter.post('/images', upload.single('file'), async (req, res) => {
  const { file } = req;
  console.log(file);
  if(file) {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(result);
    const { description } = req.body;
    res.send({ imagePath: `/images/${result.Key}` });
  }
});

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
baseRouter.use('/api/v1/messages', messageRouter);
export default baseRouter;
