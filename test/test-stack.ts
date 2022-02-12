import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { CloudCostManager } from '../src';

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Bucket(this, 'test-bucket');

    new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'staging',
    });

    // Aspects.of(this).add(new CloudCostManager(this, {
    //   customerName: 'acme-co',
    //   envName: 'staging',
    // }));

  }
}