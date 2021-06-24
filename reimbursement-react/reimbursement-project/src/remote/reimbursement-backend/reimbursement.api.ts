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
  const response = await reimbursementClient.post('/api/v1/reimbursements/form/submit', {
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
export const deleteReimbursement = async (id: number, username: string) => {
  const { data } = await reimbursementClient.delete<boolean>(`/api/v1/reimbursements/${id}/${username}`)
}
//get pending reimbursement
export const getByRole = async ( role: string, username: string,): Promise<Reimbursement[]> => {
  const { data } = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/${username}/${role}`);
  return data
}

//update amount
export const updateProjectedAmount = async(reimbursement: Reimbursement ): Promise<boolean> => {
  const response = await reimbursementClient.put('/api/v1/reimbursments/update', {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}

export const putAward = async(reimbursement: Reimbursement ): Promise<boolean> => {
  const response = await reimbursementClient.put('/api/v1/users/update', {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}



export const accept = async(reimbursement: Reimbursement ): Promise<boolean> => {
  const response = await reimbursementClient.put('/api/v1/reimbursments/accept', {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}


export const reject = async(reimbursement: Reimbursement): Promise<boolean> => {
  const response = await reimbursementClient.put(`/api/v1/reimbursments/reject`, {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}
//benco head and super update 
export const updateByRole = async(reimbursement: Reimbursement, role: string, ): Promise<boolean> => {
  const response = await reimbursementClient.put(`/api/v1/reimbursments/accept/${role}`, {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}


//view presentation
export const viewFinalSubmission = async (role: string): Promise<Reimbursement[]> => {
  const { data } = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/${role}`);
  return data
}