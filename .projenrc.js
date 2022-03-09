const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'cloudadder',
  authorAddress: 'cloudadder.com@gmail.com',
  cdkVersion: '2.15.0',
  defaultReleaseBranch: 'main',
  dependabot: false,
  name: 'cdk-constructs-demo',
  repositoryUrl: 'https://github.com/cloudadder/cdk-constructs-demo',
  jestOptions: {
    jestConfig: {
      collectCoverageFrom: ['src/**/*.ts'],
    },
  },
  homepage: 'https://github.com/cloudadder/cdk-constructs-demo',
  name: '@cloudadder/cdk-constructs-demo',
  npmAccess: 'public',
  repositoryUrl: 'https://github.com/cloudadder/cdk-constructs-demo.git',
});

//Bucket Tests
project.addTask('test:BucketTestNegitive', {
  exec: 'jest --testNamePattern=BucketTestNegitive',
});
project.addTask('test:Bucket', {
  exec: 'jest --testNamePattern=Bucket',
});

//Database Tests
project.addTask('test:DatabaseTestNegitive', {
  exec: 'jest --testNamePattern=DatabaseTestNegitive',
});
project.addTask('test:Database', {
  exec: 'jest --testNamePattern=Database',
});

project.synth();