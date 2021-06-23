import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Reimbursement from '../models/reimbursement';
import dynamo from '../connection/connectionService';
import log from '../log';

export class ReimbursementRepository {
  constructor(private docClient: DocumentClient = dynamo) {}

  async addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Reimbursements',
      Item: reimbursement,
      ReturnConsumedCapacity: 'TOTAL',
    };

    try {
      const result = await this.docClient.put(params).promise();

      log.info(result);
      return true;
    } catch(error) {
      log.debug(error);
      return false;
    }
  }

  async updateProjectedAmount(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #pr = :a',
      ExpressionAttributeValues: {
        ':a': reimbursement.projectedReimbursement,
      },
      ExpressionAttributeNames: {
        '#pr': 'projected reimbursement',
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

  async deleteReimbursement(id: string, username: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username,
        id,
      },
    };

    try {
      const result = await this.docClient.delete(params).promise();

      log.info(result);
      return true;
    } catch(error) {
      log.debug(error);
      return false;
    }
  }

  async rejectReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs',
      ExpressionAttributeValues: {
        ':rs': 'Rejected',
      },
      ExpressionAttributeNames: {
        '#s': 'status',
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

  // REQUEST MORE INFO METHOD

  async getByUsername(username: string): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Reimbursements',

      ProjectionExpression: '#id, #u, #sd, #l, #fd, #t, #c #s, #gf, #pr, #a',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#u': 'username',
        '#sd': 'start date',
        '#l': 'location',
        '#fd': 'file date',
        '#t': 'type',
        '#c': 'cost',
        '#s': 'status',
        '#gf': 'grading format',
        '#pr': 'projected reimbursement',
        '#a': 'amount awarded',
      },
      ExpressionAttributeValues: { ':user': username },
      FilterExpression: '#u = :user',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async getById(id: string): Promise<Reimbursement | null> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Reimbursements',

      ProjectionExpression: '#id, #u, #sd, #l, #fd, #t, #c #s, #gf, #pr',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#u': 'username',
        '#sd': 'start date',
        '#l': 'location',
        '#fd': 'file date',
        '#t': 'type',
        '#c': 'cost',
        '#s': 'status',
        '#gf': 'grading format',
        '#pr': 'projected reimbursement',
      },
      ExpressionAttributeValues: { ':i': id },
      FilterExpression: '#id = :i',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items[0] as Reimbursement;
    }
    console.log('wrong');
    return null;
  }

  async getAll(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Reimbursements',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async supervisorView(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'status-index',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending Supervisor' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async headView(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'status-index',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending Department Head' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async bencoView(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'status-index',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending BenCo' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewPending(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'status-index',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewGrade(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'format-index',
      ExpressionAttributeNames: {
        '#gf': 'grading format',
      },
      ExpressionAttributeValues: { ':f': 'Letter Grade' },
      FilterExpression: '#gf = :f',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewPresentation(): Promise<Reimbursement[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Reimbursements',
      IndexName: 'format-index',
      ExpressionAttributeNames: {
        '#gf': 'grading format',
      },
      ExpressionAttributeValues: { ':f': 'Presentation' },
      FilterExpression: '#gf = :f',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  // Benco
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
        ':ra': reimbursement.projectedReimbursement,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#a': 'amount awarded',
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

  // Benco
  async setPendingGrade(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs, #pr = :ra',
      ExpressionAttributeValues: {
        ':rs': 'Pending',
        ':ra': reimbursement.projectedReimbursement,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#pr': 'projected reimbursement',
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

  // DepHead
  async setToPendingBenco(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs',
      ExpressionAttributeValues: {
        ':rs': 'Pending BenCo',
      },
      ExpressionAttributeNames: {
        '#s': 'status',
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

  // directSupervisor
  async setToPendingHead(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Reimbursements',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs',
      ExpressionAttributeValues: {
        ':rs': 'Pending Department Head',
      },
      ExpressionAttributeNames: {
        '#s': 'status',
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

  // add attachments?
}
const reimbursementRepository = new ReimbursementRepository();
export default reimbursementRepository;
