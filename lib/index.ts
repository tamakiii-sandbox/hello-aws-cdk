import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const greetingTable = new dynamodb.Table(this, 'greeting', {
      tableName: 'greeting',
      partitionKey: {
        name: 'greetingId',
        type: dynamodb.AttributeType.STRING
      },
    })

    const putGreetingItemLambda = new lambda.Function(this, 'putGreetingItemLambda', {
      code: lambda.Code.asset('src/lambda'),
      handler: 'hello-cdk.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      timeout: cdk.Duration.seconds(3),
      environment: {
        GREETING_TABLE_NAME: greetingTable.tableName,
        REGION: props && props.env!.region ? props.env!.region : 'ap-northeast-1'
      }
    })

    greetingTable.grantReadWriteData(putGreetingItemLambda);

    const api = new apigateway.RestApi(this, 'itemsApi', {
      restApiName: 'hello-cdk-greeting'
    })

    const greetingResource = api.root.addResource('greeting');

    const putGreetingItemIntegration = new apigateway.LambdaIntegration(putGreetingItemLambda, {
      proxy: false,
      integrationResponses: [
        {
          statusCode: '200',
          responseTemplates: {
            'application/json': '$input.json("$")'
          }
        }
      ],
      passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_MATCH,
      requestTemplates: {
        'application/json': '$input.json("$")'
      }
    })

    greetingResource.addMethod('POST', putGreetingItemIntegration, {
      methodResponses: [
        {statusCode: '200'}
      ]
    })
  }
}

const app = new cdk.App()
new HelloCdkStack(app, 'HelloCdkApp', { env: { region: 'ap-northeast-1' }})
app.synth();