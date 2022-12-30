.PHONY: help

help:
	@cat $(firstword $(MAKEFILE_LIST))

# compile typescript to js
build:
	npm run build

# watch for changes and compile
watch:
	npm run watch

# perform the jest unit tests
test:
	npm run test

# deploy this stack to your default AWS account/region
deploy:
	cdk deploy

# compare deployed stack with current state
diff:
	cdk diff

# emits the synthesized CloudFormation template
synth:
	cdk synth

