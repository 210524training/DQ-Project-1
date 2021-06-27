import Reimbursement from '../models/reimbursement';
import reimbursementRepository from '../repositories/reimbursementRepo';
import reimbursementService from './reimbursementService';

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

function projectedAmount(cost: string, eventType: string): number {
  let result;
  switch (eventType) {
  case 'University Course':
    result = percentage(Number(cost), 80);
    return result;
  case 'Seminar':
    result = percentage(Number(cost), 60);
    return result;
  case 'Certification Preparation Class':
    result = percentage(Number(cost), 75);
    return result;
  case 'Certification':
    result = percentage(Number(cost), 80);
    return result;
  case 'Technical Training':
    result = percentage(Number(cost), 90);
    return result;
  case 'Other':
    result = percentage(Number(cost), 30);
    return result;
  default:
    return 0;
  }
}

function capProjection(cost: string, eventType: string) {
  const result = projectedAmount(cost, eventType);
  const projection = (result > 1000) ? 1000 : result;
  return projection;
}

export default async function updateProjection(reimbursement: Reimbursement) {
  const projection = capProjection(reimbursement.cost, reimbursement.type);
  const found = await reimbursementRepository.getById(reimbursement.id);
  if(found) {
    found.projected = projection;
    return found;
  }
  return null;
}

// export function conditionalView(role: string, username: string): Promise<Reimbursement[]> {
//   if(role === 'Supervisor') {
//     return reimbursementService.supervisorView();
//   } if(role === 'Department Head') {
//     return reimbursementService.headView();
//   } if(role === 'Benco') {
//     return reimbursementService.bencoView();
//   } if(role === 'Employee') {
//     return reimbursementService.getByUsername(username);
//   } throw new Error('something went wrong');
// }

// export function conditionalUpdate(reimbursement: Reimbursement, role: string) {
//   if(role === 'Supervisor') {
//     return reimbursementService.supervisorUpdate(reimbursement);
//   } if(role === 'Department Head') {
//     return reimbursementService.headUpdate(reimbursement);
//   } if(role === 'Benco') {
//     return reimbursementService.bencoUpdate(reimbursement);
//   } throw new Error('something went wrong');
// }
