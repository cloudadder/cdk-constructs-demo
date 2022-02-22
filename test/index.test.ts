import { App } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { TestStack, TestStackWithErrors } from './test-stack';

describe('Cloud Cost Manager', () => {
  test('confirm cloud cost management is implemented', () => {
    const app = new App();
    const stack = new TestStack(app, 'TestStack');

    Annotations.fromStack(stack).hasInfo('/TestStack',
      'CloudCostManager validation passed',
    );

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      Tags: [
        {
          Key: 'cloud-cost-manager-check-intelligent-tiering',
          Value: 'pass',
        },
        {
          Key: 'cloud-cost-manager-customer-name',
          Value: 'acme-co',
        },
        {
          Key: 'cloud-cost-manager-env-name',
          Value: 'staging',
        },
        {
          Key: 'cloud-cost-manager-version',
          Value: '1.0.0',
        },
      ],
    });
  });

  test('confirm cloud cost management reject stack', () => {
    const app = new App();
    const stack = new TestStackWithErrors(app, 'TestStack');

    Annotations.fromStack(stack).hasError('/TestStack',
      'Bucket requires intelligent tiering',
    );
  });
});