export default class User {
  constructor(
    public username: string,
    public password: string,
    public role: string,
    public amountAwarded: number = 0,
  ) {} // reimbursement balance?
}

export type Role = 'Employee' | 'Supervisor' | 'Department Head' | 'Benco';
