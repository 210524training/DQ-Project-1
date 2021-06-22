import Reimbursement from '../models/reimbursement';
import reimbursementRepository from '../repositories/reimbursementRepo';

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

function projectedAmount(cost: number, eventType: string): number {
  let result;
  switch (eventType) {
  case 'University Course':
    result = percentage(cost, 80);
    return result;
  case 'Seminar':
    result = percentage(cost, 60);
    return result;
  case 'Certification Preparation Class':
    result = percentage(cost, 75);
    return result;
  case 'Certification':
    result = percentage(cost, 80);
    return result;
  case 'Technical Training':
    result = percentage(cost, 90);
    return result;
  case 'Other':
    result = percentage(cost, 30);
    return result;
  default:
    return 0;
  }
}

function capProjection(cost: number, eventType: string) {
  const result = projectedAmount(cost, eventType);
  const projection = (result > 1000) ? 1000 : result;
  return projection;
}

export default async function updateProjection(reimbursement: Reimbursement) {
  const projection = capProjection(reimbursement.cost, reimbursement.type);
  const found = await reimbursementRepository.getById(reimbursement.id);
  if(found) {
    found.projectedReimbursement = projection;
    return found;
  }
  return null;
}
