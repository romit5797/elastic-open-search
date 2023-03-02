import { Client } from "@opensearch-project/opensearch";
import AWS from "aws-sdk";
import createAwsOpensearchConnector from "aws-opensearch-connector";

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const AWS_CONFIG = new AWS.Config({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

export const client = new Client({
  ...createAwsOpensearchConnector(AWS_CONFIG),
  node: process.env.ELASTIC_CLUSTER,
});
