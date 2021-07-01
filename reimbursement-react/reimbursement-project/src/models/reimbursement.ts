import { v4 as uuidv4 } from 'uuid';

export default class Reimbursement {
    constructor(
      public id: string = uuidv4(),
      public username: string,
      public start: string,
      public location: string,
      public file: string,
      public type: string,
      public cost: string,
      public status: string = "Pending Supervisor",
      public format: string,
      public projected: number = 0,
      public awarded: number = 0,
      public note: string,
      public urgent: boolean,
      public fileName?: string,
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
  
