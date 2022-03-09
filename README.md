# AWS CDK Constructs Demo
The purpose of this demo is to show how to use the AWS CDK constructs to create reusable components.

We will focus on the following use cases:

* A business needs to create a way to manage cost control across multiple Deployments and Environments in their AWS accounts.  A construct will be created to tag environments to assit in cost control.  The construct will also check certain resources for typical cost saving patterns, such as S3 Buckets with Intelligent-Tiering enabled.

[![build](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/build.yml/badge.svg)](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/build.yml)
[![release](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/release.yml/badge.svg)](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/release.yml)

### Installation and Usage

```console
npm install @cloudadder/cdk-constructs-demo
```
```typescript
import { CloudCostManager } from '@cloudadder/cdk-constructs-demo';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CloudCostManagerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CloudCostManager(this, 'CloudCostManager', {
      customerName: 'acme-co',
      envName: 'staging',
    });
  }
}
```

#### Links
* [npmjs](https://www.npmjs.com/package/@cloudadder/cdk-constructs-demo)
* [cdk constructs.dev](https://constructs.dev/packages/@cloudadder/cdk-constructs-demo)

#### License

Distributed under the [Apache-2.0](./LICENSE) license.

