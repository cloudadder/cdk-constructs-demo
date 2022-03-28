import { Annotations, IAspect, Stack, Tags } from 'aws-cdk-lib';
import { CfnDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { CfnDBInstance, DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';


export interface CloudCostManagerProps {
  /**
   * The name of the customer that the stack is for.
   * e.g. ```'acme-co'```
   */
  readonly customerName: string;

  /**
   * The name of the environment.
   * e.g. ```'production'```
   */
  readonly envName: string;
}

export class CloudCostManager implements IAspect {
  private error!: string;
  private stack: Stack;
  private props: CloudCostManagerProps;

  constructor(stack: Stack, props: CloudCostManagerProps) {
    this.stack = stack;
    this.props = props;
    Tags.of(stack).add('cloud-cost-manager:customer-name', props.customerName);
    Tags.of(stack).add('cloud-cost-manager:env-name', props.envName);
  }

  visit(node: IConstruct): void {

    //Bucket Check
    if (node instanceof CfnBucket) {
      if (!node.intelligentTieringConfigurations) {
        this.error = 'Buckets require intelligent tiering';
      } else {
        node.tags.setTag('cloud-cost-manager:check:bucket', 'pass');
      }
    }

    //Database Check
    var databaseError: boolean = false;
    if (node instanceof DatabaseInstance) {
      const engine = Stack.of(node).resolve(node.engine);

      if (engine.engineType === 'sqlserver-ee') {
        databaseError = true;
        this.error = 'Do not use MSSQL Enterprise Edition, it is too expensive.';
      }
    }
    if (node instanceof CfnDBInstance) {
      if (this.props.envName !== 'production' && node.multiAz) {
        databaseError = true;
        this.error += 'Multi-AZ is not supported in Non Production Environments.';
      }
      if (!databaseError) {
        node.tags.setTag('cloud-cost-manager:check:database', 'pass');
      }
    }

    //CloudFront Check
    if (node instanceof CfnDistribution) {
      node.addPropertyOverride('DistributionConfig.ViewerCertificate.MinimumProtocolVersion', 'TLSv1.2_2021');

      Annotations.of(this.stack).addInfo('The Minimum Security Policy all CloudFront Distributions is TLSv1.2_2021');
      node.tags.setTag('cloud-cost-manager:check:cloudfront', 'pass');
    }

    //Add All Errors
    if (this.error) {
      Annotations.of(this.stack).addError(this.error);

    } else {
      Annotations.of(this.stack).addInfo('CloudCostManager validation passed');
    }
  }
}


