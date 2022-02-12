const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  cdkVersion: '2.12.0',
  defaultReleaseBranch: 'main',
  name: 'iac-testing',
  repositoryUrl: 'https://github.com/matthew.wood/iac-testing.git',
  releaseToNpm: false,
  github: false,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();