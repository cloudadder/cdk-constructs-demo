import { App } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { TestStackWithDatabaseNegitive, TestStackWithDatabasePositive } from './TestStacks';

describe('Cloud Cost Manager Database', () => {
  test('(DatabaseTestNegitive): confirm cloud cost management reject stack database', () => {
    const app = new App();
    var stack = new TestStackWithDatabaseNegitive(app, 'TestStackWithDatabase');

    Annotations.fromStack(stack).hasError('/TestStackWithDatabase',
      'Do not use MSSQL Enterprise Edition, it is too expensive.Multi-AZ is not supported in Non Production Environments.',
    );
  });

  test('(DatabaseTestPositive): confirm cloud cost management is implemented for database', () => {
    const app = new App();
    var stack = new TestStackWithDatabasePositive(app, 'TestStackWithDatabase');
    Annotations.fromStack(stack).hasInfo('/TestStackWithDatabase',
      'CloudCostManager validation passed',
    );

    Template.fromStack(stack).hasResourceProperties('AWS::RDS::DBInstance', {
      Tags: [
        {
          Key: 'cloud-cost-manager:check:database',
          Value: 'pass',
        },
        {
          Key: 'cloud-cost-manager:customer-name',
          Value: 'acme-co',
        },
        {
          Key: 'cloud-cost-manager:env-name',
          Value: 'production',
        },
      ],
    });
  });

  test('Snapshot Database', () => {
    const app = new App();
    const stack = new TestStackWithDatabasePositive(app, 'test');

    expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
  });
});