import { log } from 'console';
import Reimbursement from '../models/reimbursement';
import reimbursementRepository, { ReimbursementRepository } from '../repositories/reimbursementRepo';
import updateProjection from './projectedReimbursement';
import userService from './userService';

export class ReimbursementService {
  private dao: ReimbursementRepository;

  constructor() {
    this.dao = reimbursementRepository;
  }

  getAll(): Promise<Reimbursement[]> {
    return this.dao.getAll();
  }

  getByUsername(username: string): Promise<Reimbursement[]> {
    console.log('am i being called?');
    return this.dao.getByUsername(username);
  }

  getByID(id: string, username: string): Promise<Reimbursement | null> {
    return this.dao.getById(id, username);
  }

  async add(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.addReimbursement(reimbursement);
  }

  // has a get byid
  async update(reimbursement: Reimbursement): Promise<boolean> {
    const found = await updateProjection(reimbursement);
    if(found) {
      return this.dao.updateProjectedAmount(found);
    } return false;
  }

  reject(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.rejectReimbursement(reimbursement);
  }

  delete(id: string, username: string): Promise<boolean> {
    return this.dao.deleteReimbursement(id, username);
  }

  // havent added to router
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

  supervisorView(): Promise<Reimbursement[]> {
    return this.dao.supervisorView();
  }

  headView(): Promise<Reimbursement[]> {
    return this.dao.headView();
  }

  bencoView(): Promise<Reimbursement[]> {
    return this.dao.bencoView();
  }

  viewGrade(): Promise<Reimbursement[]> {
    return this.dao.viewGrade();
  }

  viewPresentation(): Promise<Reimbursement[]> {
    return this.dao.viewPresentation();
  }
}

const reimbursementService = new ReimbursementService();

export default reimbursementService;
