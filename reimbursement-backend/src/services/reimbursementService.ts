import Reimbursement from '../models/reimbursement';
import reimbursementRepository, { ReimbursementRepository } from '../repositories/reimbursementRepo';

export class ReimbursementService {
  private dao: ReimbursementRepository;

  constructor() {
    this.dao = reimbursementRepository;
  }

  getAll(): Promise<Reimbursement[]> {
    return this.dao.getAll();
  }

  getByUsername(username: string): Promise<Reimbursement[]> {
    return this.dao.getByUsername(username);
  }

  add(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.addReimbursement(reimbursement);
  }

  reject(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.rejectReimbursement(reimbursement);
  }

  delete(id: number, username: string): Promise<boolean> {
    return this.dao.deleteReimbursement(id, username);
  }

  getAllPending(): Promise<Reimbursement[]> {
    return this.dao.viewPending();
  }

  accept(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.acceptReimbursement(reimbursement);
  }

  bencoUpdate(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.setPendingGrade(reimbursement);
  }

  headUpdate(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.setToPendingBenco(reimbursement);
  }

  supervisorUpdate(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.setToPendingHead(reimbursement);
  }
}

const reimbursementService = new ReimbursementService();

export default reimbursementService;
