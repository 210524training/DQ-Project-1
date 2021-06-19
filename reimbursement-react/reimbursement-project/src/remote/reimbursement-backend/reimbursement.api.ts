import User from "../../models/user";
import reimbursementClient from "./reimbursement.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await reimbursementClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}