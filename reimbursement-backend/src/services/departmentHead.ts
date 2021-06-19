import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Reimbursement from "../models/reimbursement";
import dynamo from "../connection/connectionService";
import log from "../log";

class DepartmentHead {
  constructor(private docClient: DocumentClient = dynamo) {}

  async updateReimbursement(reimbursement: Reimbursement): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: "Reimbursements",
      Key: {
        username: reimbursement.username,
        id: reimbursement.id,
      },
      UpdateExpression: "SET #s = :rs",
      ExpressionAttributeValues: {
        ":rs": "Pending BenCo",
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

  // requestMoreInfo() {

  // }
}

export default new DepartmentHead();
