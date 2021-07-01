import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Reimbursement from '../models/reimbursement';
import dynamo from '../connection/connectionService';
import log from '../log';

export class ReimbursementRepository {
  constructor(private docClient: DocumentClient = dynamo) {}

  async addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'rs-table',
      Item: {
        id: reimbursement.id,
        username: reimbursement.username,
        start: reimbursement.start,
        location: reimbursement.location,
        file: reimbursement.file,
        type: reimbursement.type,
        cost: reimbursement.cost,
        status: reimbursement.status,
        format: reimbursement.format,
        projected: reimbursement.projected,
        awarded: reimbursement.awarded,
        note: reimbursement.note,
        urgent: reimbursement.urgent,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };

    try {
      const result = await this.docClient.put(params).promise();

      log.info('successsss');
      log.info(result);
      return true;
    } catch(error) {
      log.debug('add reimbursement repo fail');
      log.debug(error);
      return false;
    }
  }

  async updateProjectedAmount(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #pr = :a',
      ExpressionAttributeValues: {
        ':a': reimbursement.projected,
      },
      ExpressionAttributeNames: {
        '#pr': 'projected',
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
      TableName: 'rs-table',
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
      TableName: 'rs-table',
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
    console.log('inside the username reimbursement repository func');
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',

      ProjectionExpression: '#id, #u, #sd, #l, #fd, #t, #c, #s, #gf, #pr, #a, #n, #ur',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#u': 'username',
        '#sd': 'start',
        '#l': 'location',
        '#fd': 'file',
        '#t': 'type',
        '#c': 'cost',
        '#s': 'status',
        '#gf': 'format',
        '#pr': 'projected',
        '#a': 'awarded',
        '#n': 'note',
        '#ur': 'urgent',
      },
      ExpressionAttributeValues: { ':user': username },
      FilterExpression: '#u = :user',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      log.info('something is working');
      return data.Items as Reimbursement[];
    }
    log.debug('something is wrong');
    return [];
  }

  async getById(id: string): Promise<Reimbursement | null> {
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',

      ExpressionAttributeValues: {
        ':i': id,
      },
      ExpressionAttributeNames: {
        '#id': 'id',
      },
      FilterExpression: '#id = :i',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      console.log(data.Items);
      return data.Items[0] as Reimbursement;
    }
    console.log('wrong');
    return null;
  }

  async getAll(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async supervisorView(): Promise<Reimbursement[]> {
    console.log('inside the sup reimbursement repository func');
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending Supervisor' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async headView(): Promise<Reimbursement[]> {
    console.log('inside the head reimbursement repository func');
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending Department Head' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async bencoView(): Promise<Reimbursement[]> {
    console.log('inside the benco reimbursement repository func');
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending BenCo' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewPending(): Promise<Reimbursement[]> {
    console.log('inside the reimbursement repository func');
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':rs': 'Pending' },
      FilterExpression: '#s = :rs',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewGrade(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#gf': 'format',
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':f': 'Letter Grade', ':st': 'Pending' },
      FilterExpression: '#gf = :f AND #s = :st',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewPresentation(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'rs-table',
      ExpressionAttributeNames: {
        '#gf': 'format',
        '#s': 'status',
      },
      ExpressionAttributeValues: { ':f': 'Presentation', ':st': 'Pending' },
      FilterExpression: '#gf = :f AND #s = :st',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  // Benco
  async acceptReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs, #a = :ra',
      ExpressionAttributeValues: {
        ':rs': 'Accepted',
        ':ra': reimbursement.projected,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#a': 'awarded',
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
    console.log('repo set pending head');
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #s = :rs, #pr = :ra',
      ExpressionAttributeValues: {
        ':rs': 'Pending',
        ':ra': reimbursement.projected,
      },
      ExpressionAttributeNames: {
        '#s': 'status',
        '#pr': 'projected',
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
    console.log('inside set pending benco');
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
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
    console.log('inside set pending head');
    console.log(reimbursement.username, reimbursement.id);
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
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

  async updateFile(reimbursement: Reimbursement): Promise<boolean> {
    console.log('inside update file');
    console.log(reimbursement.username, reimbursement.id);
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'rs-table',
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: 'SET #fn = :f',
      ExpressionAttributeValues: {
        ':f': reimbursement.fileName,
      },
      ExpressionAttributeNames: {
        '#fn': 'file name',
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
}
const reimbursementRepository = new ReimbursementRepository();
export default reimbursementRepository;
