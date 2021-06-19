import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Reimbursement from "../models/reimbursement";
import dynamo from "../connection/connectionService";
import log from "../log";

class ReimbursementRepository {
  constructor(private docClient: DocumentClient = dynamo) {}

  async addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: "Reimbursements",
      Item: reimbursement,
      ReturnConsumedCapacity: "TOTAL",
    };

    try {
      const result = await this.docClient.put(params).promise();

      log.info(result);
      return true;
    } catch (error) {
      log.debug(error);
      return false;
    }
  }

  async deleteReimbursement(id: number, username: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: "Reimbursements",
      Key: {
        username,
        id,
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

  async rejectReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: "Reimbursements",
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: "SET #s = :rs",
      ExpressionAttributeValues: {
        ":rs": "Rejected",
      },
      ExpressionAttributeNames: {
        "#s": "status",
      },
      ReturnValues: "UPDATED_NEW",
    };
    try {
      const result = await this.docClient.update(params).promise();

      log.info(result);
      return true;
    } catch (error) {
      log.error(error);
      return false;
    }
  }

  // REQUEST MORE INFO METHOD

  async getByUsername(username: string): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: "Reimbursements",

      ProjectionExpression: "#u, #id, #fd, #a, #s, #gf, #sd",
      ExpressionAttributeNames: {
        "#u": "username",
        "#id": "id",
        "#fd": "file date",
        "#a": "amount",
        "#s": "status",
        "#gf": "grading format",
        "#sd": "start date",
      },
      ExpressionAttributeValues: { ":user": username },
      FilterExpression: "#u = :user",
    };

    const data = await this.docClient.scan(params).promise();

    if (data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async getAll(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: "Reimbursements",
      ProjectionExpression: "#u, #id, #fd, #a, #s, #gf, #sd",
      ExpressionAttributeNames: {
        "#u": "username",
        "#id": "id",
        "#fd": "file date",
        "#a": "amount",
        "#s": "status",
        "#gf": "grading format",
        "#sd": "start date",
      },
    };

    const data = await this.docClient.scan(params).promise();

    if (data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  async viewPending(): Promise<Reimbursement[]> {
    const params: DocumentClient.ScanInput = {
      TableName: "Reimbursements",
      ProjectionExpression: "#u, #id, #fd, #a, #s, #gf, #sd",
      ExpressionAttributeNames: {
        "#u": "username",
        "#id": "id",
        "#fd": "file date",
        "#a": "amount",
        "#s": "status",
        "#gf": "grading format",
        "#sd": "start date",
      },
      ExpressionAttributeValues: { ":rs": "Pending" },
      FilterExpression: "#s = :rs",
    };

    const data = await this.docClient.scan(params).promise();

    if (data.Items) {
      return data.Items as Reimbursement[];
    }

    return [];
  }

  // add attachments?
}

export default new ReimbursementRepository();
