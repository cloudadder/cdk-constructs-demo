# AWS CDK Constructs Demo
The purpose of this demo is to show how to use the AWS CDK constructs to create reusable components.

We will focus on the following use case:

* A business needs to create a way to manage cost control across multiple Deployments and Environments in their AWS accounts.  A construct will be created to tag environments to assit in cost control reporting.  The construct will also check certain resources for typical cost saving patterns, such as S3 Buckets with Intelligent-Tiering enabled.

[![build](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/build.yml/badge.svg)](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/build.yml)
[![release](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/release.yml/badge.svg)](https://github.com/cloudadder/cdk-constructs-demo/actions/workflows/release.yml)

#### Prerequisites
This demo focuses on the using the most common way to write CDK constructs using the [typescript](https://www.typescriptlang.org/) language.

* install [node.js](https://nodejs.org/en/)

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

#### Handy
* To update npm libraries, run:
```console
npm outdated
npx npm-check-updates -u
npm install
```
* To enable github to raise pull requests then in github create a [token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and then a [secret](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md) for the repo called `PROJEN_GITHUB_TOKEN`.

#### Links
* [npmjs](https://www.npmjs.com/package/@cloudadder/cdk-constructs-demo)
* [cdk constructs.dev](https://constructs.dev/packages/@cloudadder/cdk-constructs-demo)

#### License

Distributed under the [Apache-2.0](./LICENSE) license.

