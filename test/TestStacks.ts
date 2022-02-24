import { Aspects, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket, CfnBucket, IntelligentTieringConfiguration } from 'aws-cdk-lib/aws-s3';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';
import { Construct } from 'constructs';
import { CloudCostManager } from '../src';

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Bucket(this, 'test-bucket', {
      intelligentTieringConfigurations: [{
        name: 'test-tier',
      }],
    });

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'staging',
    }));

  }
}

export class TestStackWithErrors extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Bucket(this, 'test-bucket');

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'staging',
    }));
  }
}

export class ExistingBucketWithErrors extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CfnInclude(this, 'ExistingBucket', {
      templateFile: 'test/ExistingBucket.json',
    });

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'staging',
    }));
  }
}

export class ExistingBucketAfterAddingTiering extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const template = new CfnInclude(this, 'ExistingBucket', {
      templateFile: 'test/ExistingBucket.json',
    });

    const cfnBucket = template.getResource('ExistingBucket') as CfnBucket;
    const intelligentTieringConfiguration: IntelligentTieringConfiguration = {
      name: 'test-tier',
    };
    cfnBucket.addPropertyOverride('IntelligentTieringConfiguration', intelligentTieringConfiguration);

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'staging',
    }));
  }
}