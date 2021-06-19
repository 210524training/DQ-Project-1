import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User, { Role } from "../models/user";
import dynamo from "../connection/connectionService";
import log from "../log";

export class UserRepository {
  public currentUser: User | undefined;

  public userRole: Role | undefined;

  constructor(private docClient: DocumentClient = dynamo) {}

  async attemptRegister(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: "USERS-table",
      Item: {
        role: user.role,
        username: user.username,
        password: user.password,
      },
      ConditionExpression: "attribute_not_exists(username)",
    };
    try {
      const result = await this.docClient.put(params).promise();

      log.info(result);
      console.log("You have successfully registered");
      return true;
    } catch (error) {
      log.debug(error);
      return false;
    }
  }

  async findUser(
    username: string,
    password: string
  ): Promise<User | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: "USERS",
      Key: {
        password,
        username,
      },
    };
    const data = await this.docClient.get(params).promise();
    return data.Item as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    const params: DocumentClient.QueryInput = {
      TableName: "USERS-table",
      KeyConditionExpression: "#u = :user",
      ExpressionAttributeValues: {
        ":user": username,
      },
      ExpressionAttributeNames: {
        "#u": "username",
        "#p": "password",
        "#r": "role",
      },
      ProjectionExpression: "#u, #p, #r",
    };

    const data = await this.docClient.query(params).promise();

    if (data.Items) {
      return data.Items[0] as User;
    }

    return null;
  }

  // async createAccount(): Promise<void> {
  //   const username = await queryUsername();
  //   const password = await queryPassword();
  //   if(await this.findUser(username, password)) {
  //     console.log('this username already exists');
  //     throw new Error('username taken');
  //   }

  //   const role = await queryRole();

  //   const newUser = new User(username, password, role);
  //   this.attemptRegister(newUser);
  // }

  async deleteUser(user: User): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: "USERS-table",
      Key: {
        username: user.username,
        password: user.password,
      },
    };

    try {
      const result = await this.docClient.delete(params).promise();

      log.info(result);
      return true;
    } catch (error) {
      log.debug(error);
      return false;
    }
  }

  async getAll(): Promise<User[]> {
    const params: DocumentClient.ScanInput = {
      TableName: "USERS-table",
      ProjectionExpression: "#u, #r",
      ExpressionAttributeNames: {
        "#u": "username",
        "#r": "role",
      },
    };

    const data = await this.docClient.scan(params).promise();

    if (data.Items) {
      return data.Items as User[];
    }

    return [];
  }
}

const userRepository = new UserRepository();
export default userRepository;
