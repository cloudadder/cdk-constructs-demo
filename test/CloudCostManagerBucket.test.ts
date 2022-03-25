import { App } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { ExistingBucketAfterAddingTiering, ExistingBucketWithErrors, TestStackBucket, TestStackBucketWithErrors } from './TestStacks';

describe('Cloud Cost Manager Bucket', () => {
  test('(BucketTestNegitive): confirm cloud cost management reject stack for bucket', () => {
    const app = new App();
    var stack = new TestStackBucketWithErrors(app, 'TestStackBucket');

    Annotations.fromStack(stack).hasError('/TestStackBucket',
      'Buckets require intelligent tiering',
    );
  });

  test('(BucketTestPositve): confirm cloud cost management is implemented for bucket', () => {
    const app = new App();
    const stack = new TestStackBucket(app, 'TestStackBucket');

    Annotations.fromStack(stack).hasInfo('/TestStackBucket',
      'CloudCostManager validation passed',
    );

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      Tags: [
        {
          Key: 'cloud-cost-manager:check:bucket',
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
      ],
    });
  });

  test('(ExistingCFTestNegitive): confirm cloud cost management reject stack for bucket from existing CF', () => {
    const app = new App();
    var stack = new ExistingBucketWithErrors(app, 'TestStackBucket');

    Annotations.fromStack(stack).hasError('/TestStackBucket',
      'Buckets require intelligent tiering',
    );
  });

  test('(ExistingCFTestPositve): confirm cloud cost management is implemented for bucket from existing CF', () => {
    const app = new App();
    const stack = new ExistingBucketAfterAddingTiering(app, 'TestStackBucket');

    Annotations.fromStack(stack).hasInfo('/TestStackBucket',
      'CloudCostManager validation passed',
    );

    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      Tags: [
        {
          Key: 'cloud-cost-manager:check:bucket',
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
      ],
    });
  });

  test('Snapshot Bucket', () => {
    const app = new App();
    const stack = new TestStackBucket(app, 'test');

    expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
  });
});