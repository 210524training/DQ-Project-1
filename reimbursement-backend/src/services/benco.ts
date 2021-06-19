import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Reimbursement from '../models/reimbursement';
import dynamo from '../connection/connectionService';
import log from '../log';

class BencoService {
  constructor(private docClient: DocumentClient = dynamo) {}

  async pendingGrade(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs, #a = :ra',
      ExpressionAttributeValues: {
        ':rs': 'Pending',
        ':ra': reimbursement.amount,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#a': 'amount',
      },
      ReturnValues: 'UPDATED_NEW',
    };
    try {
      const result = await this.docClient.update(params).promise();

      log.info(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  async acceptReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs, #a = :ra',
      ExpressionAttributeValues: {
        ':rs': 'Accepted',
        ':ra': reimbursement.amount,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#a': 'amount',
      },
      ReturnValues: 'UPDATED_NEW',
    };
    try {
      const result = await this.docClient.update(params).promise();

      log.info(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  // alter amount
}

export default new BencoService();
