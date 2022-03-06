const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'cloudcost',
  cdkVersion: '2.13.0',
  defaultReleaseBranch: 'main',
  name: 'iac-testing',
  repositoryUrl: 'https://github.com/tinytelly/iac-testing.git',
  releaseToNpm: false,
  github: false,
  jestOptions: {
    jestConfig: {
      collectCoverageFrom: ['src/**/*.ts'],
    },
  },
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