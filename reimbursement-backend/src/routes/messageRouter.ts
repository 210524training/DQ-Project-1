import { Router, Request, Response } from 'express';
import Message from '../models/message';
import messageService from '../services/messageService';

const messageRouter = Router();

messageRouter.get('/:recipient', async (req, res) => {
  try {
    console.log('inside message routes');

    res.json(
      await messageService.getByRecipient(req.params.recipient),
    );
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

messageRouter.get('/sender/:role', async (req, res) => {
  try {
    console.log('inside message routes');

    res.json(
      await messageService.getBySenderRole(req.params.role),
    );
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

messageRouter.get('/recipient/:role', async (req, res) => {
  try {
    console.log('inside message routes');

    res.json(
      await messageService.getByRecipientRole(req.params.role),
    );
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

// eslint-disable-next-line max-len
export async function postMessage(req: Request<unknown, unknown, Message, object>, res: Response): Promise<void> {
  const message = req.body;
  console.log(message);
  const result = await messageService.add(message);
  if(!result) {
    res.status(500);
  } else {
    res.status(201).send();
  }
}

messageRouter.post('/send', postMessage);

export default messageRouter;
