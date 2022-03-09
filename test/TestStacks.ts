import { Aspects, Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, SqlServerEngineVersion } from 'aws-cdk-lib/aws-rds';
import { Bucket, CfnBucket, IntelligentTieringConfiguration } from 'aws-cdk-lib/aws-s3';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';
import { Construct } from 'constructs';
import { CloudCostManager } from '../src';

export class TestStackBucket extends Stack {
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

export class TestStackBucketWithErrors extends Stack {
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

export class TestStackWithDatabaseNegitive extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'TestVPC', {
      cidr: '10.0.0.0/16',
    });
    new DatabaseInstance(this, 'DatabaseInstance', {
      engine: DatabaseInstanceEngine.sqlServerEe({ version: SqlServerEngineVersion.VER_14_00_3356_20_V1 }),
      vpc,
      multiAz: true,
    });

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'non-production',
    }));
  }
}

export class TestStackWithDatabasePositive extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'TestVPC', {
      cidr: '10.0.0.0/16',
    });
    new DatabaseInstance(this, 'DatabaseInstance', {
      engine: DatabaseInstanceEngine.sqlServerSe({ version: SqlServerEngineVersion.VER_14_00_3356_20_V1 }),
      vpc,
    });

    Aspects.of(this).add(new CloudCostManager(this, {
      customerName: 'acme-co',
      envName: 'production',
    }));
  }
}