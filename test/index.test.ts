import { App } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { TestStack } from './test-stack';

describe('TestingStack', () => {
  test('confirm cloud cost management tags are working', () => {
    const app = new App();
    const stack = new TestStack(app, 'TestStack');
    console.log(Annotations.fromStack(stack));

    // Annotations.fromStack(stack).hasInfo('/TestStack',
    //   'CloudCostManager Tags are correctly set',
    // );

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      Tags: [
        {
          Key: 'cloud-cost-manager-customer-name',
          Value: 'acme-co',
        },
        {
          Key: 'cloud-cost-manager-env-name',
          Value: 'staging',
        },
      ],
    });
  });
});