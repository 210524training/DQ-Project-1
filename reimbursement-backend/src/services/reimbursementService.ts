import { log } from 'console';
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
    console.log('inside services');
    return this.dao.getByUsername(username);
  }

  getByID(id: string): Promise<Reimbursement | null> {
    return this.dao.getById(id);
  }

  async add(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.addReimbursement(reimbursement);
  }

  // has a get byid
  // async update(reimbursement: Reimbursement): Promise<boolean> {
  //   const found = await updateProjection(reimbursement);
  //   if(found) {
  //     return this.dao.updateProjectedAmount(found);
  //   } return false;
  // }

  reject(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.rejectReimbursement(reimbursement);
  }

  delete(id: string, username: string): Promise<boolean> {
    return this.dao.deleteReimbursement(id, username);
  }

  // havent added to router
  getAllPending(): Promise<Reimbursement[]> {
    console.log('inside services');
    return this.dao.viewPending();
  }

  accept(reimbursement: Reimbursement): Promise<boolean> {
    return this.dao.acceptReimbursement(reimbursement);
  }

  bencoUpdate(reimbursement: Reimbursement): Promise<boolean> {
    console.log('inside backend benco service');
    return this.dao.setPendingGrade(reimbursement);
  }

  headUpdate(reimbursement: Reimbursement): Promise<boolean> {
    console.log('inside backend head service');
    return this.dao.setToPendingBenco(reimbursement);
  }

  supervisorUpdate(reimbursement: Reimbursement): Promise<boolean> {
    console.log('inside backend sup service');
    console.log(reimbursement.username, reimbursement.id);
    return this.dao.setToPendingHead(reimbursement);
  }

  supervisorView(): Promise<Reimbursement[]> {
    console.log('inside services');
    return this.dao.supervisorView();
  }

  headView(): Promise<Reimbursement[]> {
    console.log('inside services');
    return this.dao.headView();
  }

  bencoView(): Promise<Reimbursement[]> {
    console.log('inside services');
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
