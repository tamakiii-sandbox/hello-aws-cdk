#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EmptyStack } from '../lib/empty-stack';

const app = new cdk.App();
new EmptyStack(app, 'EmptyStack');
