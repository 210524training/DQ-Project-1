import { log } from "console";
import Reimbursement from "../../models/reimbursement";
import User from "../../models/user";
import reimbursementClient from "./reimbursement.client";
import { v4 as uuidv4 } from 'uuid';

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await reimbursementClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}

export const register = async ({username, password, role}: User): Promise<boolean> => {
  const response = await reimbursementClient.post('/register', {
    username,
    password,
    role,
  });

  if(response) {
    return true;
  }

  return false;
}

//add reimbursement 
export const addReimbursement = async ({id, username, startDate, location, fileDate, type, cost, status, format, projectedReimbursement, amountAwarded}: Reimbursement): Promise<boolean> => {
  const response = await reimbursementClient.post('/api/v1/reimbursements', {
    Reimbursement: {
      id: uuidv4(), 
      username,
      startDate,
      location,
      fileDate,
      type,
      cost,
      status: 'Pending Supervisor', 
      format,
      projectedReimbursement: 0,
      amountAwarded: 0,
}
  })

  if (response) { 
    console.log('reimbursement added successfully')
    return true;
  } console.log('unable to submit reimbursement')
  return false;
}

//delete reimbursement
export const deleteReimbursement = async ({id, username}) => {
  const { data } = await reimbursementClient.delete<boolean>('/api/v1/reimbursements/')
}
//get pending reimbursement
export const getByUsername = async (username: string) => {
  const { data } = await reimbursementClient.get<Reimbursement[]>('/api/v1/reimbursements/:username/:role')
}
//benco view, sup view, head view
export const getByRole = async ()
//update amount

//reject 

//accept 

//benco head and super update 

//view grade

//view presentation