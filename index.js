const core = require('@actions/core');
const AWS = require('aws-sdk');
const { SSM } = require('@aws-sdk/client-ssm');
const { parseSecretPairs } = require('./parse-secret-pairs');

async function run() {
  const region = core.getInput('aws-region');

  if (region) {
    AWS.config.update({ region });
  }

  const secretsInput = core.getInput('secrets', { required: true });
  const secrets = parseSecretPairs(secretsInput);

  const ssm = new SSM({ apiVersion: '2014-11-06' });

  await Promise.all(secrets.map((s) => saveSecret(ssm, s)));

  core.info(`Successfully Stored ${secrets.length} parameters.`);
}

async function saveSecret(ssm, secret) {
  const params = {
    Name: secret.key,
    Value: secret.value,
    Type: 'String',
    Overwrite: true,
  };

  const result = await ssm.putParameter(params);

  core.debug(`Parameter ${secret.name} details: Version [${result.Version}] Tier [${result.Tier}]`);
}

run().catch((e) => core.setFailed(e.message));
