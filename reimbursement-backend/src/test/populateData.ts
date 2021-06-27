import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Message from '../models/message';
import reimbursement from '../models/reimbursement';
import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import messageService from '../services/messageService';
import reimbursementService from '../services/reimbursementService';
import userService from '../services/userService';

dotenv.config({});

const message = new Message(
  'hershey',
  'Employee',
  'hello',
  'Gary',
  'BenCo',
);

async function populateTable() {
  // const result = await reimbursementService.getByID('9fb96149-5aa1-4754-8b80-f5686350f81a', 'david');
  // if(result) {
  const result = await messageService.add(message);
  console.log(result);
}

(async () => {
  try {
    await populateTable();
  } catch(error) {
    console.log('Failed to populate table: ', error);
  }
})();
