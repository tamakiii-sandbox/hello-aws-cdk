import { UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import * as Aws from 'aws-sdk';
// import { GreetingMessage, User } from './types';

const EnvironmentVariableSample = process.env.GREETING_TABLE_NAME!;
const Region = process.env.REGION!;

const Dynamo = new Aws.DynamoDB({
  apiVersion: '2012-08-10',
  region: Region
});

export interface User {
  name: string;
}

export interface GreetingMessage {
  title: string;
  description: string;
}

export async function handler(event: User): Promise<GreetingMessage> {
  return HelloWorldUseCase.hello(event);
}

export class HelloWorldUseCase {
  public static async hello(userInfo: User): Promise<GreetingMessage> {
    const message = HelloWorldUseCase.createMessage(userInfo);
    await DynamodbGreetingTable.greetingStore(message);
    return message;
  }

  private static createMessage(userInfo: User): GreetingMessage {
    return {
      title: `hello, ${userInfo.name}`,
      description: 'My first message.',
    }
  }
}

export class DynamodbGreetingTable {
  public static async greetingStore(greeting: GreetingMessage): Promise<void> {
    const params: UpdateItemInput = {
      TableName: EnvironmentVariableSample,
      Key: {
        greetingId: {S: 'hello-cdk-item'}
      },
      UpdateExpression: [
        'set title = :title',
        'description = :description'
      ].join(', '),
      ExpressionAttributeValues: {
        ':title': {S: greeting.title},
        ':description': {S: greeting.description}
      }
    }

    await Dynamo.updateItem(params).promise()
  }
}