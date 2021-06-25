import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import User, { Role } from '../models/user';
import dynamo from '../connection/connectionService';
import log from '../log';

export class UserRepository {
  public currentUser: User | undefined;

  public userRole: Role | undefined;

  constructor(private docClient: DocumentClient = dynamo) {}

  async attemptRegister(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'USERS-table',
      Item: {
        ...user,
      },
    };
    try {
      const result = await this.docClient.put(params).promise();

      log.info(result);
      console.log('You have successfully registered');
      return true;
    } catch(error) {
      log.debug(error);
      return false;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    const params: DocumentClient.QueryInput = {
      TableName: 'USERS-table',
      KeyConditionExpression: '#u = :user',
      ExpressionAttributeValues: {
        ':user': username,
      },
      ExpressionAttributeNames: {
        '#u': 'username',
        '#p': 'password',
        '#r': 'role',
        '#a': 'amount awarded',
      },
      ProjectionExpression: '#u, #p, #r #a',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items[0] as User;
    }
    log.debug('Somn Wrooooooong');
    return null;
  }

  async findByRole(username: string, role: string): Promise<User | null> {
    const params: DocumentClient.QueryInput = {
      TableName: 'USERS-table',
      IndexName: 'role-index',
      KeyConditionExpression: '#u = :user AND #r = :ro',
      ExpressionAttributeValues: {
        ':user': username,
        ':ro': role,
      },
      ExpressionAttributeNames: {
        '#u': 'username',
        '#p': 'password',
        '#r': 'role',
      },
      ProjectionExpression: '#u, #p, #r',
    };

    const data = await this.docClient.query(params).promise();

    if(data.Items) {
      return data.Items[0] as User;
    }

    return null;
  }

  // async updateMessage(user:User): Promise<boolean> {
  //   const params: DocumentClient.UpdateItemInput = {
  //     TableName: 'USERS-table',
  //     Key: {
  //       username: user.username,
  //       role: user.role,
  //     },
  //     UpdateExpression: 'SET #m = :n',
  //     ExpressionAttributeValues: {
  //       ':n': user.messages,
  //     },
  //     ExpressionAttributeNames: {
  //       '#m': 'messages',
  //     },
  //     ReturnValues: 'UPDATED_NEW',
  //   };
  //   try {
  //     const result = await this.docClient.update(params).promise();

  //     log.info(result);
  //     return true;
  //   } catch(error) {
  //     log.error(error);
  //     return false;
  //   }
  // }

  async deleteUser(user: User): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'USERS-table',
      Key: {
        username: user.username,
        password: user.role,
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

  async getAll(): Promise<User[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'USERS-table',
      ProjectionExpression: '#u, #r',
      ExpressionAttributeNames: {
        '#u': 'username',
        '#r': 'role',
      },
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as User[];
    }

    return [];
  }

  // async getMessages(username: string): Promise<Message[]> {
  //   const params: DocumentClient.ScanInput = {
  //     TableName: 'USERS-table',
  //     ProjectionExpression: '#m',
  //     ExpressionAttributeNames: {
  //       '#m': 'messages',
  //       '#u': 'username',
  //     },
  //     ExpressionAttributeValues: { ':user': username },
  //     FilterExpression: '#u = :user',
  //   };

  //   const data = await this.docClient.scan(params).promise();

  //   if(data.Items) {
  //     return data.Items as Message[];
  //   }

  //   return [];
  // }

  async addAward(user: User): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'USERS-table',
      Key: {
        username: user.username,
        role: user.role,
      },
      UpdateExpression: 'SET #a = :aa',
      ExpressionAttributeValues: {
        ':aa': user.amountAwarded,
      },
      ExpressionAttributeNames: {
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
}

const userRepository = new UserRepository();
export default userRepository;
