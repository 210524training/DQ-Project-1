import { v4 as uuidv4 } from 'uuid';

export default class Reimbursement {
    constructor(
      public id: string = uuidv4(),
      public username: string,
      public startDate: string,
      public location: string,
      public fileDate: string,
      public type: string,
      public cost: string,
      public status: string = "Pending Supervisor",
      public format: string,
      public projectedReimbursement: number = 0,
      public amountAwarded: number = 0,
    ) {}
  }
  
  export type EventType =
    | "University Course"
    | "Seminar"
    | "Certification Preparation Class"
    | "Certification"
    | "Technical Training";
  export type Status =
    | "Pending" | "Pending Supervisor"
    | "Pending Department Head"
    | "Pending BenCo"
    | "Accepted"
    | "Rejected";
  export type GradeFormat = "Letter Grade" | "Presentation";
  