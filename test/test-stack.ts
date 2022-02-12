import { Aspects, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { CloudCostManager } from '../src';

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Bucket(this, 'test-bucket');

    // Add a tag to all constructs in the stack
    Tags.of(this).add('cloud-cost-manager-customer-name', 'TheBest');

    Aspects.of(this).add(new CloudCostManager(this, {
        customerName: 'TheBest',
        envName: 'TheBest',
    }));

  }
}