import { Annotations, IAspect, Stack, Tags, Tokenization } from 'aws-cdk-lib';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';


export interface CloudCostManagerProps {
  /**
   * The name of the customer that the stack is for.
   * e.g. ```'acme-co'```
   */
  customerName: string;

  /**
 * The name of the environment.
 * e.g. ```'production'```
 */
  envName: string;
}

export class CloudCostManager implements IAspect {
  private props: CloudCostManagerProps;
  constructor(stack: Stack, props: CloudCostManagerProps) {
    this.props = props;
    Tags.of(stack).add('cloud-cost-manager-customer-name', this.props.customerName);
    Tags.of(stack).add('cloud-cost-manager-env-name', this.props.envName);
    Tags.of(stack).add('cloud-cost-manager-version', '1.0.0');
  }
  visit(node: IConstruct): void {
    if (node instanceof CfnBucket ) {
      console.log('!!!!!!!!!!!!!!');
      console.log(node.intelligentTieringConfigurations);

      if (!node.intelligentTieringConfigurations
        || (!Tokenization.isResolvable(node.intelligentTieringConfigurations)
            && node.intelligentTieringConfigurations.forEach(element => {
              console.log('!!!!' + element.toString());
            }))) {

      }

    }
  }
}

export class CloudSecurityManager implements IAspect {
  private error!: string;
  private stack: Stack;
  private props: CloudCostManagerProps;
  constructor(stack: Stack, props: CloudCostManagerProps) {
    this.stack = stack;
    this.props = props;
  }

  public visit(node: IConstruct): void {

    if (node instanceof CfnBucket ) {
      if (!node.tags.hasTags()) {
        this.error = 'Bucket tags are not set';
      } else {
        var tags: string[] = [];
        for (let tagObject of node.tags.renderTags()) {
          tags.push(tagObject.key);
        }

        if (!(tags.includes('cloud-cost-manager-customer-name'))) {
          this.error = 'Bucket tags are not set';
        }
      }
    }

    if (this.error) {
      Annotations.of(this.stack).addError(this.error);
    } else {
      Annotations.of(this.stack).addInfo('CloudCostManager Tags are correctly set');
    }
    console.log(this.props.customerName);

  }
}


