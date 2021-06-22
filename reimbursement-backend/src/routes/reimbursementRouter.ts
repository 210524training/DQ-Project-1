import express, { Router } from 'express';
import reimbursementRepository from '../repositories/reimbursementRepo';
import Reimbursement from '../models/reimbursement';

const reimbursementRouter = Router();

reimbursementRouter.get('/', async (req, res) => {
  res.json(await reimbursementRepository.getAll());
});

reimbursementRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(await reimbursementRepository.getByUsername(username));
});

reimbursementRouter.post(
  '/',
  async (
    req: express.Request<unknown, unknown, Reimbursement, unknown, {}>,
    res,
  ) => {
    res.json(await reimbursementRepository.addReimbursement(req.body));
  },
);

reimbursementRouter.put(
  '/',
  async (
    req: express.Request<unknown, unknown, Reimbursement, unknown, {}>,
    res,
  ) => {
    res.json(await reimbursementRepository.rejectReimbursement(req.body));
  },
);

reimbursementRouter.delete('/:username/:id', async (req, res) => {
  const { username } = req.params;
  const id = Number(req.params);

  res.json(await reimbursementRepository.deleteReimbursement(id, username));
});

export default reimbursementRouter;
