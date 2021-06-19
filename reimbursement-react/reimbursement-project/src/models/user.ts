export default class User {
    constructor(
        public username: string,
        public password: string,
        public role: Role,
      // reimbursement balance?
    ) {}
  }
  
  export type Role = 'Employee' | 'Supervisor' | 'Head' | 'Benco';
  