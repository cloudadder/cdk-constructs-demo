import { App, Aspects } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { CloudCostManager } from '../src';
import { ExistingBucketAfterAddingTiering, ExistingBucketWithErrors, TestStack, TestStackWithDatabase, TestStackWithErrors, TestStackWithoutAspect } from './TestStacks';

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
          Key: 'cloud-cost-manager:check:intelligent-tiering',
          Value: 'pass',
        },
        {
          Key: 'cloud-cost-manager:customer-name',
          Value: 'acme-co',
        },
        {
          Key: 'cloud-cost-manager:env-name',
          Value: 'staging',
        },
        {
          Key: 'cloud-cost-manager:version',
          Value: '1.0.0',
        },
      ],
    });
  });

  test('confirm cloud cost management reject stack', () => {
    const app = new App();
    var stack = new TestStackWithErrors(app, 'TestStack');

    Annotations.fromStack(stack).hasError('/TestStack',
      'Bucket requires intelligent tiering',
    );

    stack = new TestStackWithDatabase(app, 'TestStackWithDatabase');

    Annotations.fromStack(stack).hasError('/TestStackWithDatabase',
      'Do not use MSSQL Enterprise Edition, it is too expensive.',
    );

    Annotations.fromStack(stack).hasError('/TestStackWithDatabase',
      'Multi-AZ is not supported in Non Prodcution Environments.',
    );
  });

  test('confirm cloud cost management reject stack when using existing cfn template', () => {
    const app = new App();
    const stack = new ExistingBucketWithErrors(app, 'TestStack');

    Annotations.fromStack(stack).hasError('/TestStack',
      'Bucket requires intelligent tiering',
    );
  });

  test('confirm cloud cost management is implemented', () => {
    const app = new App();
    const stack = new ExistingBucketAfterAddingTiering(app, 'TestStack');

    Annotations.fromStack(stack).hasInfo('/TestStack',
      'CloudCostManager validation passed',
    );
  });

  test('confirm aspect works across app rather than just stack', () => {
    const app = new App();
    const stack = new TestStackWithoutAspect(app, 'TestStack');

    Aspects.of(app).add(new CloudCostManager(stack, {
      customerName: 'acme-co',
      envName: 'staging',
    }));

    Annotations.fromStack(stack).hasInfo('/TestStack',
      'CloudCostManager validation passed',
    );
  });

  test('Snapshot', () => {
    const app = new App();
    const stack = new TestStack(app, 'test');

    expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
  });
});