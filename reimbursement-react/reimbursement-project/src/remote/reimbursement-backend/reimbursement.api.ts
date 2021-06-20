import Reimbursement from "../../models/reimbursement";
import reimbursement from "../../models/reimbursement";
import User from "../../models/user";
import reimbursementClient from "./reimbursement.client";

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


// export const addReimbursement = async (id, username, startDate, location, fileDate, type, amount, status, format): Promise<Reimbursement> => {
//   const {data: reimbursement} = await reimbursementClient.post<Reimbursement>('/reimbursements', {
//     id, 
//     username, 
//     startDate, 
//     location, 
//     fileDate, 
//     type, 
//     amount,
//     status, 
//     format,
//   });
//   return reimbursement
// }