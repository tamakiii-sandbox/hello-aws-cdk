#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { HelloStack } from '../lib/hello-stack';

const app = new cdk.App();
new HelloStack(app, 'HelloStack');
