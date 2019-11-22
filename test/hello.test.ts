import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Hello = require('../lib/hello-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Hello.HelloStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});