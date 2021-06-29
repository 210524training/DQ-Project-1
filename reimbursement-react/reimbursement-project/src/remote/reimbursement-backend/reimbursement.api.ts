import { log } from "console";
import Reimbursement from "../../models/reimbursement";
import User from "../../models/user";
import reimbursementClient from "./reimbursement.client";
import { v4 as uuidv4 } from 'uuid';
import { EndOfLineState } from "typescript";
import Message from "../../models/message";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await reimbursementClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}

export const register = async ({username, password, role}: User): Promise<boolean> => {
  const response = await reimbursementClient.post('/api/v1/users/register', {
    username,
    password,
    role,
  });

  if(response) {
    console.log(response)
    return true;
  }
    console.log(response)
  return false;
}

export const sendMessage = async ({recipient, recipientRole, note, sender, senderRole}: Message): Promise<boolean> => {
  const response = await reimbursementClient.post('/api/v1/messages/send', {
    recipient,
    recipientRole,
    note,
    sender,
    senderRole
  });

  if(response) {
    console.log(response)
    return true;
  }
    console.log(response)
  return false;
}

export const postImage = async ({image, description}: any) => {
  const formData = new FormData();
  formData.append("file", image)
  formData.append("description", description)
  
  const result = await reimbursementClient.post('/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'}
    })
    return result.data
}

export const getImage = async (key: string) => {
  console.log('inside get user remote')
  const {data} = await reimbursementClient.get(`/images/${key}`);
  console.log(data);
  return data;
}



export const getMessageByRecipient = async (recipient: string): Promise<Message[]> => {
  console.log('inside get message by recipient remote')
  const {data} = await reimbursementClient.get<Message[]>(`api/v1/users/${recipient}`);
  console.log(data);
  return data;
}

export const getMessageBySenderRole = async (role: string): Promise<Message[]> => {
  console.log('inside get message by sender role remote')
  const {data} = await reimbursementClient.get<Message[]>(`api/v1/users/sender/${role}`);
  console.log(data);
  return data;
}

export const getMessageByRecipientRole = async (role: string): Promise<Message[]> => {
  console.log('inside get message by sender role remote')
  const {data} = await reimbursementClient.get<Message[]>(`api/v1/users/sender/recipient/${role}`);
  console.log(data);
  return data;
}


//add reimbursement 
export const addReimbursement = async ({ id, username, start, location, file, type, cost, status, format, projected, awarded, note}: Reimbursement): Promise<boolean> => {
  const response = await reimbursementClient.post('/api/v1/reimbursements/form/submit', {
      id, 
      username,
      start,
      location,
      file,
      type,
      cost,
      status, 
      format,
      projected,
      awarded,
      note
  })

  if (response) { 
    console.log('reimbursement added successfully')
    return true;
  } console.log('unable to submit reimbursement')
  return false;
}

//delete reimbursement
export const deleteReimbursement = async (id: string, username: string) => {
  const response = await reimbursementClient.delete<boolean>(`/api/v1/reimbursements/delete/${id}/${username}`)

  if(response) {
    return true;
  }
  return false;
}

//get pending reimbursement
// export const getByRole = async ( role: string, username: string,): Promise<Reimbursement[]> => {
//   const {data} = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/${username}/${role}`);
//   return data
// }

export const getByID= async (id: string): Promise<Reimbursement> => {
  console.log('inside get by ID')
  const  {data}  = await reimbursementClient.get<Reimbursement>(`/api/v1/reimbursements/target/${id}`);
  return data
}

//update amount
export const updateProjectedAmount = async(reimbursement: Reimbursement ): Promise<boolean> => {
  console.log('inside update projected amount')
  const response = await reimbursementClient.put('/api/v1/reimbursements/update', {reimbursement,});

  if(response) {
    return true;
  }
  return false;
}


export const getUser = async (username: string): Promise<User> => {
  console.log('inside get user remote')
  const {data} = await reimbursementClient.get<User>(`api/v1/users/${username}`);
  console.log(data);
  return data;
}

export const putAward = async(user: User ): Promise<boolean> => {
  console.log('inside put award remote')
  const response = await reimbursementClient.put('/api/v1/users/update', user,);

  if(response) {
    return true;
  }
  return false;
}



export const accept = async(reimbursement: Reimbursement ): Promise<boolean> => {
  console.log('inside accept')
  const response = await reimbursementClient.put('/api/v1/reimbursements/accept', reimbursement,);

  if(response) {
    return true;
  }
  return false;
}


export const reject = async(reimbursement: Reimbursement): Promise<boolean> => {
  console.log('inside reject')
  const response = await reimbursementClient.put(`/api/v1/reimbursements/reject`, reimbursement,);

  if(response) {
    return true;
  }
  return false;
}
//benco head and super update 
// export const updateByRole = async(reimbursement: Reimbursement, role: string, ): Promise<boolean> => {
//   const response = await reimbursementClient.put(`/api/v1/reimbursements/accept/${role}`, {reimbursement,});

//   if(response) {
//     return true;
//   }
//   return false;
// }


//view presentation
export const viewFinalGrade = async (): Promise<Reimbursement[]> => {
    const { data } = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/approval/benco`);
  return data
    
  }

  export const viewPresentation = async (): Promise<Reimbursement[]> => {
    const { data } = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/approval/supervisor`);
  return data
  }

//conditionalviews
export const supervisorView = async (): Promise<Reimbursement[]> => {
  console.log('inside sup api');
  const {data} = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/supervisor`)
  return data;
}

export const headView = async (): Promise<Reimbursement[]> => {
  console.log('inside head api');
  const {data} = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/head`)
  return data;
}

export const bencoView = async (): Promise<Reimbursement[]> => {
  console.log('inside benco api');
  const result = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/benco`)
  return result.data
}

export const getByUsername = async (username: string): Promise<Reimbursement[]> => {
  console.log('inside user api');
  const result = await reimbursementClient.get<Reimbursement[]>(`/api/v1/reimbursements/${username}`)
  console.log();
  return result.data
}

//conditionalupdates
export const bencoUpdate = async(reimbursement: Reimbursement): Promise<boolean> => {
  console.log('inside benco update')
  const response = await reimbursementClient.put(`/api/v1/reimbursements/accept/benco`, reimbursement,);
  if (response) {
    alert('claim accepted')
    return true
  } else {
    alert('could not accept claim')
    return false
}
}

export const headUpdate = async(reimbursement: Reimbursement): Promise<boolean> => {
  console.log('inside head update')
  const response = await reimbursementClient.put(`/api/v1/reimbursements/accept/head`, reimbursement,);
  if (response) {
    alert('claim accepted')
    return true
  }  else {
    alert('could not accept claim')
    return false
}
}

export const supervisorUpdate = async(reimbursement: Reimbursement): Promise<boolean> => {
  console.log('inside sup update')
  const response = await reimbursementClient.put(`/api/v1/reimbursements/accept/supervisor`, reimbursement,)
  if (response) {
    alert('claim accepted');
    return true
  } else {
    alert ('could not accept claim')
    return false
  }
  
}
