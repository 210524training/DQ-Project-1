import {
  Router, Request, Response,
} from 'express';
import reimbursementService from '../services/reimbursementService';
import log from '../log';
// import { conditionalUpdate, conditionalView } from '../services/projectedReimbursement';
import Reimbursement from '../models/reimbursement';

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
  console.log('inside accept r route');
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
  const reimbursement: Reimbursement = req.body;
  console.log('this is the router ', reimbursement);
  const result = await reimbursementService.supervisorUpdate(reimbursement);
  if(!result) {
    res.status(500);
  } else {
    res.status(202);
  }
}

async function deleteClaim(req: Request, res: Response): Promise<void> {
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

// async function viewFinalSubmission(req: Request, res: Response): Promise<void> {
//   const { role } = req.params;

//   res.json(
//     await viewFinalGrade(role),
//   );
// }

reimbursementRouter.get('/target/:id', async (req, res) => {
  try {
    console.log('inside ideee reimbursement routes');

    res.json(
      await reimbursementService.getByID(req.params.id),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function getByID(req: Request, res: Response): Promise<void> {
//   const { id } = req.params;
//   res.json(
//     await reimbursementService.getByID(id),
//   );
// }
// async function getByUsername(req: Request, res: Response): Promise<void> {
//   console.log('inside routes');

//   res.json(await reimbursementService.getByUsername(req.params.username));
//   res.status(200).send();
// }

async function getByUsername(req: Request, res: Response): Promise<void> {
  console.log('inside get user reimbursement routes');
  if(req.session.user) {
    const myReim = await reimbursementService.getByUsername(req.params.username);
    res.status(200).json(myReim);
  }
}

// reimbursementRouter.get('/:username', async (req, res) => {
//   try {
//     console.log('inside get user reimbursement routes');

//     if(!req.session.isLoggedIn || !req.session.user) {
//       throw new Error('You must be logged in to access this functionality');
//     }
//     console.log('Current user: ', req.session.user.username);

//     res.json(
//       await reimbursementService.getByUsername(req.params.username),
//     );
//     res.status(200).send();
//   } catch(error) {
//     log.error(error);
//     res.status(500).send();
//   }
// });

reimbursementRouter.get('/supervisor', async (req, res) => {
  try {
    console.log('inside reimbursement routes pending sup');

    res.json(
      await reimbursementService.supervisorView(),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function supervisorView(req: Request, res: Response): Promise<void> {
//   console.log('inside routes');
//   res.json(
//     await reimbursementService.supervisorView(),
//   );
// }

reimbursementRouter.get('/head', async (req, res) => {
  try {
    console.log('inside reimbursement routes pending head');

    res.json(
      await reimbursementService.headView(),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function headView(req: Request, res: Response): Promise<void> {
//   console.log('inside routes');
//   res.json(
//     await reimbursementService.headView(),
//   );
// }

reimbursementRouter.get('/benco', async (req, res) => {
  try {
    console.log('inside reimbursement routes pending benco');

    res.json(
      await reimbursementService.bencoView(),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function bencoView(req: Request, res: Response): Promise<void> {
//   console.log('inside routes');
//   res.json(
//     await reimbursementService.bencoView(),
//   );
// }

reimbursementRouter.get('/approval/benco', async (req, res) => {
  try {
    console.log('inside reimbursement routes view grades');

    res.json(
      await reimbursementService.viewGrade(),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function viewGrade(req: Request, res: Response): Promise<void> {
//   res.json(
//     await reimbursementService.viewGrade(),
//   );
// }

reimbursementRouter.get('/approval/supervisor', async (req, res) => {
  try {
    console.log('inside reimbursement routes supervisor approval');

    res.json(
      await reimbursementService.viewPresentation(),
    );
    res.status(200).send();
  } catch(error) {
    log.error(error);
    res.status(500).send();
  }
});

// async function viewPresentation(req: Request, res: Response): Promise<void> {
//   res.json(
//     await reimbursementService.viewPresentation(),
//   );
// }

// reimbursementRouter.get('/:username/:role', getByRole);
// reimbursementRouter.get('/:id', getByID);
// reimbursementRouter.get('/:role', viewFinalSubmission);
// reimbursementRouter.get('/pending/supervisor', supervisorView);
// reimbursementRouter.get('/pending/head', headView);
// reimbursementRouter.get('/pending/benco', bencoView);
// reimbursementRouter.get('/pending/approval/benco', viewGrade);
// reimbursementRouter.get('/pending/approval/supervisor', viewPresentation);
reimbursementRouter.get('/:username', getByUsername);

reimbursementRouter.post('/form/submit', postReimbursement);

// ALL WORKING
// reimbursementRouter.put('/update', updateProjectedAmount);
reimbursementRouter.put('/accept', acceptReimbursement);
reimbursementRouter.put('/reject', rejectReimbursement);
reimbursementRouter.put('/accept/benco', bencoUpdate);
reimbursementRouter.put('/accept/supervisor', supervisorUpdate);
reimbursementRouter.put('/accept/head', headUpdate);

reimbursementRouter.delete('/delete/:id/:username', deleteClaim);

export default reimbursementRouter;
