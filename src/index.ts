import { Annotations, IAspect, Stack, Tags } from 'aws-cdk-lib';
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
    this.props = props;
    this.stack = stack;
    this.props = props;
    Tags.of(stack).add('cloud-cost-manager-customer-name', this.props.customerName);
    Tags.of(stack).add('cloud-cost-manager-env-name', this.props.envName);
    Tags.of(stack).add('cloud-cost-manager-version', '1.0.0');
  }

  visit(node: IConstruct): void {
    if (node instanceof CfnBucket ) {
      if (!node.intelligentTieringConfigurations) {
        this.error = 'Bucket requires intelligent tiering';
      } else {
        node.tags.setTag('cloud-cost-manager-check-intelligent-tiering', 'pass');
      }
    }
    if (this.error) {
      Annotations.of(this.stack).addError(this.error);
    } else {
      Annotations.of(this.stack).addInfo('CloudCostManager validation passed');
    }
  }
}


