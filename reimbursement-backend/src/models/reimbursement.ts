export default class Reimbursement {
  constructor(
    public id: number,
    public username: string,
    public startDate: Date,
    public location: string,
    public fileDate: Date,
    public type: EventType,
    public amount: number,
    public status: Status,
    public format: GradeFormat
  ) {}
}

export type EventType =
  | "University Course"
  | "Seminar"
  | "Certification Preparation Class"
  | "Certification"
  | "Technical Training";
export type Status =
  | "Pending"
  | "Pending Department Head"
  | "Pending BenCo"
  | "Accepted"
  | "Rejected";
export type GradeFormat = "Letter Grade" | "Presentation";
