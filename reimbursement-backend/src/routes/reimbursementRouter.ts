import express, { Router } from 'express';
import httpCodes from 'http-status-codes';
import reimbursementService from '../services/reimbursementService';

const reimbursementRouter = Router();

reimbursementRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('you must be logged in to access this feature');
  }
  const result = await reimbursementService.getAll();
  res.status(httpCodes.OK).json(result);
});

reimbursementRouter.get('/:username/:role', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('you must be logged in to access this feature');
  }
  const { username, role } = req.params;

  if(role === 'Employee') {
    const userTable = await reimbursementService.getByUsername(username);
    res.status(httpCodes.OK).json(userTable);
  } else if(role === 'Supervisor') {
    const supTable = await reimbursementService.supervisorView();
    res.status(httpCodes.OK).json(supTable);
  } else if(role === 'Head') {
    const headTable = await reimbursementService.headView();
    res.status(httpCodes.OK).json(headTable);
  } else if(role === 'BenCo') {
    const bencoTable = await reimbursementService.bencoView();
    res.status(httpCodes.OK).json(bencoTable);
  } else {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

reimbursementRouter.put('/:role', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('you must be logged in to access this feature');
  }
  const { role } = req.params;
  if(role === 'Supervisor') {
    const supUpdate = await reimbursementService.supervisorUpdate(req.body);
    res.status(httpCodes.OK).json(supUpdate);
  } else if(role === 'Head') {
    const headUpdate = await reimbursementService.headUpdate(req.body);
    res.status(httpCodes.OK).json(headUpdate);
  } else if(role === 'BenCo') {
    const bencoUpdate = await reimbursementService.bencoUpdate(req.body);
    res.status(httpCodes.OK).json(bencoUpdate);
  } else {
    res.status(httpCodes.BAD_REQUEST).send();
  }
});

reimbursementRouter.put('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await reimbursementService.update(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

reimbursementRouter.post('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await reimbursementService.add(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

reimbursementRouter.put('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await reimbursementService.reject(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

reimbursementRouter.put('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const result = await reimbursementService.accept(req.body);
  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

reimbursementRouter.delete('/:username/:id', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }
  const { id, username } = req.params;

  if(!id) {
    throw new Error('no claim matches id');
  }

  const result = await reimbursementService.delete(id, username);

  if(result) {
    res.status(httpCodes.OK).json(result);
  } else {
    res.status(httpCodes.BAD_REQUEST).json(result);
  }
});

reimbursementRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('you must be logged in to access this feature');
  }
  const result = await reimbursementService.viewGrade();
  res.status(httpCodes.OK).json(result);
});

reimbursementRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('you must be logged in to access this feature');
  }
  const result = await reimbursementService.viewPresentation();
  res.status(httpCodes.OK).json(result);
});

export default reimbursementRouter;
