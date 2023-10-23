"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
const cdk = require("@aws-cdk/core");
class HelloCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // DynamoDB
        const greetingTable = new dynamodb.Table(this, 'greeting', {
            tableName: 'greeting',
            partitionKey: {
                name: 'greetingId',
                type: dynamodb.AttributeType.STRING
            },
        });
        const putGreetingItemLambda = new lambda.Function(this, 'putGreetingItemLambda', {
            code: lambda.Code.asset('src/lambda'),
            handler: 'hello-cdk.handler',
            runtime: lambda.Runtime.NODEJS_10_X,
            timeout: cdk.Duration.seconds(3),
            environment: {
                GREETING_TABLE_NAME: greetingTable.tableName,
                REGION: props && props.env.region ? props.env.region : 'ap-northeast-1'
            }
        });
        greetingTable.grantReadWriteData(putGreetingItemLambda);
        const api = new apigateway.RestApi(this, 'itemsApi', {
            restApiName: 'hello-cdk-greeting'
        });
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
        });
        greetingResource.addMethod('POST', putGreetingItemIntegration, {
            methodResponses: [
                { statusCode: '200' }
            ]
        });
    }
}
exports.HelloCdkStack = HelloCdkStack;
const app = new cdk.App();
new HelloCdkStack(app, 'HelloCdkApp', { env: { region: 'ap-northeast-1' } });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUFrRDtBQUNsRCw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELHFDQUFxQztBQUVyQyxNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMxQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLFdBQVc7UUFDWCxNQUFNLGFBQWEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN6RCxTQUFTLEVBQUUsVUFBVTtZQUNyQixZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDcEM7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLHFCQUFxQixHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDL0UsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUNyQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxXQUFXLEVBQUU7Z0JBQ1gsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLFNBQVM7Z0JBQzVDLE1BQU0sRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7YUFDMUU7U0FDRixDQUFDLENBQUE7UUFFRixhQUFhLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNuRCxXQUFXLEVBQUUsb0JBQW9CO1NBQ2xDLENBQUMsQ0FBQTtRQUVGLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUQsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRTtZQUN6RixLQUFLLEVBQUUsS0FBSztZQUNaLG9CQUFvQixFQUFFO2dCQUNwQjtvQkFDRSxVQUFVLEVBQUUsS0FBSztvQkFDakIsaUJBQWlCLEVBQUU7d0JBQ2pCLGtCQUFrQixFQUFFLGtCQUFrQjtxQkFDdkM7aUJBQ0Y7YUFDRjtZQUNELG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhO1lBQ2pFLGdCQUFnQixFQUFFO2dCQUNoQixrQkFBa0IsRUFBRSxrQkFBa0I7YUFDdkM7U0FDRixDQUFDLENBQUE7UUFFRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFO1lBQzdELGVBQWUsRUFBRTtnQkFDZixFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUM7YUFDcEI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF0REQsc0NBc0RDO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDekIsSUFBSSxhQUFhLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFDLENBQUMsQ0FBQTtBQUMzRSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb0Nka1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIER5bmFtb0RCXG4gICAgY29uc3QgZ3JlZXRpbmdUYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnZ3JlZXRpbmcnLCB7XG4gICAgICB0YWJsZU5hbWU6ICdncmVldGluZycsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ2dyZWV0aW5nSWQnLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgcHV0R3JlZXRpbmdJdGVtTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAncHV0R3JlZXRpbmdJdGVtTGFtYmRhJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuYXNzZXQoJ3NyYy9sYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsby1jZGsuaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTBfWCxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMpLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgR1JFRVRJTkdfVEFCTEVfTkFNRTogZ3JlZXRpbmdUYWJsZS50YWJsZU5hbWUsXG4gICAgICAgIFJFR0lPTjogcHJvcHMgJiYgcHJvcHMuZW52IS5yZWdpb24gPyBwcm9wcy5lbnYhLnJlZ2lvbiA6ICdhcC1ub3J0aGVhc3QtMSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZ3JlZXRpbmdUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEocHV0R3JlZXRpbmdJdGVtTGFtYmRhKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ2l0ZW1zQXBpJywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdoZWxsby1jZGstZ3JlZXRpbmcnXG4gICAgfSlcblxuICAgIGNvbnN0IGdyZWV0aW5nUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnZ3JlZXRpbmcnKTtcblxuICAgIGNvbnN0IHB1dEdyZWV0aW5nSXRlbUludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24ocHV0R3JlZXRpbmdJdGVtTGFtYmRhLCB7XG4gICAgICBwcm94eTogZmFsc2UsXG4gICAgICBpbnRlZ3JhdGlvblJlc3BvbnNlczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogJzIwMCcsXG4gICAgICAgICAgcmVzcG9uc2VUZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogJyRpbnB1dC5qc29uKFwiJFwiKSdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwYXNzdGhyb3VnaEJlaGF2aW9yOiBhcGlnYXRld2F5LlBhc3N0aHJvdWdoQmVoYXZpb3IuV0hFTl9OT19NQVRDSCxcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiAnJGlucHV0Lmpzb24oXCIkXCIpJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBncmVldGluZ1Jlc291cmNlLmFkZE1ldGhvZCgnUE9TVCcsIHB1dEdyZWV0aW5nSXRlbUludGVncmF0aW9uLCB7XG4gICAgICBtZXRob2RSZXNwb25zZXM6IFtcbiAgICAgICAge3N0YXR1c0NvZGU6ICcyMDAnfVxuICAgICAgXVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKVxubmV3IEhlbGxvQ2RrU3RhY2soYXBwLCAnSGVsbG9DZGtBcHAnLCB7IGVudjogeyByZWdpb246ICdhcC1ub3J0aGVhc3QtMScgfX0pXG5hcHAuc3ludGgoKTsiXX0=