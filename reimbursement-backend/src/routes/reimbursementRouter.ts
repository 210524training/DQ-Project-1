import {
  Router, Request, Response,
} from 'express';
import reimbursementService from '../services/reimbursementService';
import log from '../log';
import { conditionalUpdate, viewFinalGrade, conditionalView } from '../services/projectedReimbursement';
import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import userService from '../services/userService';

const reimbursementRouter = Router();

// async function getByRole(req: Request, res: Response): Promise<void> {
//   log.info('Request to fetch claims by role');

//   const { username, role } = req.params;

//   res.json(
//     await conditionalView(role, username),
//   );
// }

// eslint-disable-next-line max-len
export async function postReimbursement(req: Request<unknown, unknown, Reimbursement, object>, res: Response): Promise<void> {
  const reimbursement = req.body;
  console.log(reimbursement);
  const result = await reimbursementService.add(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(201).send();
  }
}
// eslint-disable-next-line max-len
// has get by id
// async function updateProjectedAmount(req: Request, res: Response): Promise<void> {
//   log.info('Request to update a claim');

//   const reimbursement = req.body;

//   const result = await reimbursementService.update(reimbursement);
//   if(!result) {
//     res.status(500);
//   } else {
//     res.status(202);
//   }
// }

async function acceptReimbursement(req: Request, res: Response): Promise<void> {
  const reimbursement = req.body;

  const result = await reimbursementService.accept(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function rejectReimbursement(req: Request, res: Response): Promise<void> {
  const reimbursement = req.body;

  const result = await reimbursementService.reject(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}
// just need username and id for these updates
async function bencoUpdate(req: Request, res: Response): Promise<void> {
  const reimbursement = req.body;

  const result = await reimbursementService.bencoUpdate(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function headUpdate(req: Request, res: Response): Promise<void> {
  const reimbursement = req.body;

  const result = await reimbursementService.headUpdate(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function supervisorUpdate(req: Request, res: Response): Promise<void> {
  const reimbursement = req.body;

  const result = await reimbursementService.supervisorUpdate(reimbursement);
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

// async function updateByRole(req: Request, res: Response): Promise<void> {
//   const { role } = req.params;
//   const reimbursement = req.body;

//   res.json(
//     await conditionalUpdate(reimbursement, role),
//   );
// }

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

// async function viewFinalSubmission(req: Request, res: Response): Promise<void> {
//   const { role } = req.params;

//   res.json(
//     await viewFinalGrade(role),
//   );
// }

async function getByID(req: Request, res: Response): Promise<void> {
  const { id, username } = req.params;
  res.json(
    await reimbursementService.getByID(id, username),
  );
}
async function getByUsername(req: Request, res: Response): Promise<void> {
  const { username } = req.params;
  res.json(
    await reimbursementService.getByUsername(username),
  );
}

async function supervisorView(req: Request, res: Response): Promise<void> {
  res.json(
    await reimbursementService.supervisorView(),
  );
}

async function headView(req: Request, res: Response): Promise<void> {
  res.json(
    await reimbursementService.headView(),
  );
}

async function bencoView(req: Request, res: Response): Promise<void> {
  res.json(
    await reimbursementService.bencoView(),
  );
}

async function viewGrade(req: Request, res: Response): Promise<void> {
  res.json(
    await reimbursementService.viewGrade(),
  );
}

async function viewPresentation(req: Request, res: Response): Promise<void> {
  res.json(
    await reimbursementService.viewPresentation(),
  );
}

// reimbursementRouter.get('/:username/:role', getByRole);
reimbursementRouter.get('/:id/:username', getByID);
// reimbursementRouter.get('/:role', viewFinalSubmission);
reimbursementRouter.get('/pending/supervisor', supervisorView);
reimbursementRouter.get('/pending/head', headView);
reimbursementRouter.get('/pending/benco', bencoView);
reimbursementRouter.get('/pending/approval/benco', viewGrade);
reimbursementRouter.get('/pending/approval/supervisor', viewPresentation);
reimbursementRouter.get('/username', getByUsername);

reimbursementRouter.post('/form/submit', postReimbursement);

// ALL WORKING
// reimbursementRouter.put('/update', updateProjectedAmount);
reimbursementRouter.put('/accept', acceptReimbursement);
reimbursementRouter.put('/reject', rejectReimbursement);
reimbursementRouter.put('/accept/benco', bencoUpdate);
reimbursementRouter.put('/accept/supervisor', supervisorUpdate);
reimbursementRouter.put('/accept/head', headUpdate);

reimbursementRouter.delete('/:id/:username', deleteClaim);

export default reimbursementRouter;
