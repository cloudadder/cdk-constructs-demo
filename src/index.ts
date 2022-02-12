import { Annotations, IAspect, Stack, Tags } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct, IConstruct } from 'constructs';

export interface ross {
  firstName: 'Ross';
  lastName: 'Geller';
};

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
  readonly envName: string;
}

export class CloudCostManager2 extends Construct implements IAspect {
  props: CloudCostManagerProps;
  constructor(scope: Construct, id: string, props: CloudCostManagerProps) {
    super(scope, id);
    this.props = props;
  }
  visit(node: IConstruct): void {
    if (node instanceof Bucket) {
      console.log('demo testing !!!!! ' + node);
      console.log(this.props.customerName);


    }

    Tags.of(node).add('cloud-cost-manager-customer-name', this.props.customerName);
    Tags.of(node).add('cloud-cost-manager-env-name', this.props.envName);
  }
}


export class CloudCostManager implements IAspect {
  private error!: string;
  private stack: Stack;
  private props: CloudCostManagerProps;
  constructor(stack: Stack, props: CloudCostManagerProps) {
    this.stack = stack;
    this.props = props;
  }

  public visit(node: IConstruct): void {

    if (node instanceof CfnBucket) {
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
  }
}


