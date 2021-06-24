import express, {
  Router, Request, Response,
} from 'express';
import httpCodes from 'http-status-codes';
import reimbursementService from '../services/reimbursementService';
import log from '../log';
import { conditionalUpdate, viewFinalGrade, conditionalView } from '../services/projectedReimbursement';

const reimbursementRouter = Router();

// reimbursementRouter.get('/', async (req, res) => {
//   if(!req.session.isLoggedIn || !req.session.user) {
//     throw new Error('you must be logged in to access this feature');
//   }
//   const result = await reimbursementService.getAll();
//   res.status(httpCodes.OK).json(result);
// });

// reimbursementRouter.post('/:username/:role', async (req, res) => {
//   const { username, role } = req.params;

//   if(role === 'Employee') {
//     const userTable = await reimbursementService.getByUsername(username);
//     res.status(httpCodes.OK).json(userTable);
//   } else if(role === 'Supervisor') {
//     const supTable = await reimbursementService.supervisorView();
//     res.status(httpCodes.OK).json(supTable);
//   } else if(role === 'Department Head') {
//     const headTable = await reimbursementService.headView();
//     res.status(httpCodes.OK).json(headTable);
//   } else if(role === 'Benco') {
//     const bencoTable = await reimbursementService.bencoView();
//     res.status(httpCodes.OK).json(bencoTable);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).send();
//   }
// });

// reimbursementRouter.put('/:role', async (req, res) => {
//   if(!req.session.isLoggedIn || !req.session.user) {
//     throw new Error('you must be logged in to access this feature');
//   }
//   const { role } = req.params;
//   if(role === 'Supervisor') {
//     const supUpdate = await reimbursementService.supervisorUpdate(req.body);
//     res.status(httpCodes.OK).json(supUpdate);
//   } else if(role === 'Department Head') {
//     const headUpdate = await reimbursementService.headUpdate(req.body);
//     res.status(httpCodes.OK).json(headUpdate);
//   } else if(role === 'Benco') {
//     const bencoUpdate = await reimbursementService.bencoUpdate(req.body);
//     res.status(httpCodes.OK).json(bencoUpdate);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).send();
//   }
// });

// reimbursementRouter.put('/', async (req, res) => {
//   const result = await reimbursementService.update(req.body);
//   if(result) {
//     res.status(httpCodes.OK).json(result);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).json(result);
//   }
// });

// reimbursementRouter.post('/', async (req, res) => {
//   const result = await reimbursementService.add(req.body);
//   if(result) {
//     res.status(httpCodes.OK).json(result);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).json(result);
//   }
// });

// reimbursementRouter.put('/', async (req, res) => {
//   const result = await reimbursementService.reject(req.body);
//   if(result) {
//     res.status(httpCodes.OK).json(result);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).json(result);
//   }
// });

// reimbursementRouter.put('/', async (req, res) => {
//   const result = await reimbursementService.accept(req.body);
//   if(result) {
//     res.status(httpCodes.OK).json(result);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).json(result);
//   }
// });

// reimbursementRouter.delete('/:username/:id', async (req, res) => {
//   const { id, username } = req.params;

//   if(!id) {
//     throw new Error('no claim matches id');
//   }

//   const result = await reimbursementService.delete(id, username);

//   if(result) {
//     res.status(httpCodes.OK).json(result);
//   } else {
//     res.status(httpCodes.BAD_REQUEST).json(result);
//   }
// });

// reimbursementRouter.get('/reimbursements/benco', async (req, res) => {
//   const result = await reimbursementService.viewGrade();
//   res.status(httpCodes.OK).json(result);
// });

// reimbursementRouter.get('/reimbursements/role', async (req, res) => {
//   const result = await reimbursementService.viewPresentation();
//   res.status(httpCodes.OK).json(result);
// });

// reimbursementRouter.get('/reimbursements/:username', async (req, res) => {
//   const { username } = req.params;

//   const result = await reimbursementService.getByUsername(username);
//   res.status(httpCodes.OK).json(result);
// });

// export default reimbursementRouter;

// const claimRouter = Router();

// async function getAllClaims(req: Request, res: Response): Promise<void> {
//   log.info('Request to fetch all claims');

//   if(!req.session.isLoggedIn || !req.session.user) {
//     throw new AuthenticationError();
//   }

//   res.json(
//     await claimService.getAll(),
//   );
// }

// async function getByUsername(req: Request, res: Response): Promise<void> {
//   log.info('Request to fetch a claim');

//   const { username } = req.params;

//   res.json(
//     await reimbursementService.getByUsername(username),
//   );
// }

async function getByRole(req: Request, res: Response): Promise<void> {
  log.info('Request to fetch claims by role');

  const { username, role } = req.params;

  res.json(
    await conditionalView(role, username),
  );
}

async function postReimbursement(req: Request, res: Response): Promise<void> {
  log.info('Request to create a claim');

  const { claim } = req.body;

  const result = await reimbursementService.add(claim);
  if(!result) {
    res.status(500);
  } else {
    res.status(201).send();
  }
}

async function updateProjectedAmount(req: Request, res: Response): Promise<void> {
  log.info('Request to update a claim');

  const { reimbursement } = req.body;

  const result = await reimbursementService.update(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function acceptReimbursement(req: Request, res: Response): Promise<void> {
  const { reimbursement } = req.body;

  const result = await reimbursementService.accept(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function rejectReimbursement(req: Request, res: Response): Promise<void> {
  const { reimbursement } = req.body;

  const result = await reimbursementService.reject(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function deleteClaim(req: Request, res: Response): Promise<void> {
  log.info('Request to delete a claim');

  const { id, username } = req.params;

  const result = await reimbursementService.delete(id, username);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function updateByRole(req: Request, res: Response): Promise<void> {
  const { role } = req.params;
  const { reimbursement } = req.body;

  res.json(
    await conditionalUpdate(reimbursement, role),
  );
}

async function viewFinalSubmission(req: Request, res: Response): Promise<void> {
  const { role } = req.params;

  res.json(
    await viewFinalGrade(role),
  );
}

reimbursementRouter.get('/:username/:role', getByRole);
reimbursementRouter.get('/:role', viewFinalSubmission);
reimbursementRouter.post('/form/submit', postReimbursement);
reimbursementRouter.put('/update', updateProjectedAmount);
reimbursementRouter.put('/accept', acceptReimbursement);
reimbursementRouter.put('/reject', rejectReimbursement);
reimbursementRouter.put('/accept/:role', updateByRole);
reimbursementRouter.delete('/:id/:username', deleteClaim);

export default reimbursementRouter;
