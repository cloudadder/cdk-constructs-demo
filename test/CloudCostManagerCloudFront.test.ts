import { App } from 'aws-cdk-lib';
import { Annotations, Template } from 'aws-cdk-lib/assertions';
import { TestStackCloudFront, TestStackWithDatabasePositive } from './TestStacks';

describe('Cloud Cost Manager CloudFront', () => {
  test('(CloudFrontTestPositive): confirm cloud cost management is implemented for database', () => {
    const app = new App();
    var stack = new TestStackCloudFront(app, 'TestStackWithCloudFront');
    Annotations.fromStack(stack).hasInfo('/TestStackWithCloudFront',
      'CloudCostManager validation passed',
    );

    Template.fromStack(stack).hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultCacheBehavior: {
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          Compress: true,
          LambdaFunctionAssociations: [
            {
              EventType: 'viewer-request',
              LambdaFunctionARN: 'arn:aws:lambda:us-east-1:123456789012:function:functionName:1',
            },
          ],
          TargetOriginId: 'TestStackWithCloudFrontTestDistroOrigin1C4B7BCE0',
          ViewerProtocolPolicy: 'allow-all',
        },
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        Origins: [
          {
            DomainName: {
              'Fn::GetAtt': [
                'TestBucket560B80BC',
                'RegionalDomainName',
              ],
            },
            Id: 'TestStackWithCloudFrontTestDistroOrigin1C4B7BCE0',
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Join': [
                  '',
                  [
                    'origin-access-identity/cloudfront/',
                    {
                      Ref: 'TestDistroOrigin1S3Origin20F9517B',
                    },
                  ],
                ],
              },
            },
          },
        ],
        ViewerCertificate: {
          MinimumProtocolVersion: 'TLSv1.2_2021',
        },
      },
      Tags: [
        {
          Key: 'cloud-cost-manager:check:cloudfront',
          Value: 'pass',
        },
        {
          Key: 'cloud-cost-manager:customer-name',
          Value: 'acme-co',
        },
        {
          Key: 'cloud-cost-manager:env-name',
          Value: 'staging',
        },
      ],
    });
  });

  test('Snapshot CloudFront', () => {
    const app = new App();
    const stack = new TestStackWithDatabasePositive(app, 'test');

    expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
  });
});