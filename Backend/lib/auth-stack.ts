import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
      },
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
    });

    // const signUpFunction = new lambda.Function(this, 'SignUpFunction', {
    //   runtime: lambda.Runtime.NODEJS_18_X,
    //   handler: 'signUp.handler',
    //   code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    //   environment: {
    //     CLIENT_ID: userPoolClient.userPoolClientId,
    //   },
    // });

    // userPoolClient.grantRead(signUpFunction);
    
    // signUpFunction.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['cognito-idp:SignUp'],
    //   resources: ['*'],
    // }));
  }
}
