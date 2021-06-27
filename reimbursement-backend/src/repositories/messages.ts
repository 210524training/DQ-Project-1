import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../connection/connectionService';
import log from '../log';
import Message from '../models/message';

export class MessageRepository {
  constructor(private docClient: DocumentClient = dynamo) {}

  async addMessage(message: Message): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'message-table',
      Item: {
        recipient: message.recipient,
        recipientRole: message.recipientRole,
        note: message.note,
        sender: message.sender,
        senderRole: message.senderRole,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };

    try {
      const result = await this.docClient.put(params).promise();

      log.info(result);
      return true;
    } catch(error) {
      log.debug('add message fail');
      log.debug(error);
      return false;
    }
  }

  //   async updateMessage(message: Message): Promise<boolean> {
  //     const params: DocumentClient.UpdateItemInput = {
  //       TableName: 'r-table',
  //       Key: {
  //         username: reimbursement.username,
  //         id: reimbursement.id,
  //       },
  //       UpdateExpression: 'SET #pr = :a',
  //       ExpressionAttributeValues: {
  //         ':a': reimbursement.projectedReimbursement,
  //       },
  //       ExpressionAttributeNames: {
  //         '#pr': 'projected reimbursement',
  //       },
  //       ReturnValues: 'UPDATED_NEW',
  //     };
  //     try {
  //       const result = await this.docClient.update(params).promise();

  //       log.info(result);
  //       return true;
  //     } catch(error) {
  //       log.error(error);
  //       return false;
  //     }
  //   }

  async getByRecipient(recipient: string): Promise<Message[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'message-table',

      ProjectionExpression: '#r, #rr, #s, #sr, #n',
      ExpressionAttributeNames: {
        '#r': 'recipient',
        '#rr': 'recipientRole',
        '#s': 'sender',
        '#sr': 'senderRole',
        '#n': 'note',
      },
      ExpressionAttributeValues: { ':rec': recipient },
      FilterExpression: '#r = :rec',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      log.info('something is working');
      return data.Items as Message[];
    }
    log.debug('something is wrong');
    return [];
  }

  async getBySenderRole(senderRole: string): Promise<Message[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'message-table',

      ProjectionExpression: '#r, #rr, #s, #sr, #n',
      ExpressionAttributeNames: {
        '#r': 'recipient',
        '#rr': 'recipientRole',
        '#s': 'sender',
        '#sr': 'senderRole',
        '#n': 'note',
      },
      ExpressionAttributeValues: { ':ro': senderRole },
      FilterExpression: '#sr = :ro',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      log.info('something is working');
      return data.Items as Message[];
    }
    log.debug('something is wrong');
    return [];
  }

  async getByRecipientRole(recipientRole: string): Promise<Message[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'message-table',

      ProjectionExpression: '#r, #rr, #s, #sr, #n',
      ExpressionAttributeNames: {
        '#r': 'recipient',
        '#rr': 'recipientRole',
        '#s': 'sender',
        '#sr': 'senderRole',
        '#n': 'note',
      },
      ExpressionAttributeValues: { ':rec': recipientRole },
      FilterExpression: '#rr = :rec',
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      log.info('something is working');
      return data.Items as Message[];
    }
    log.debug('something is wrong');
    return [];
  }
}

const messageRepository = new MessageRepository();
export default messageRepository;
