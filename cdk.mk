.PHONY: help info build watch test deploy diff synth

export AWS_PROFILE := $(shell grep 'AWS_PROFILE' .env | awk -F= '{print $$2}')
export AWS_REGION := $(shell grep 'AWS_REGION' .env | awk -F= '{print $$2}')

help:
	@cat $(firstword $(MAKEFILE_LIST))

info:
	@echo "AWS_PROFILE := $(AWS_PROFILE)"
	@echo "AWS_REGION := $(AWS_REGION)"

build:
	npm run build

watch:
	npm run watch

test:
	npm run test

deploy:
	cdk deploy

diff:
	cdk diff

synth:
	cdk synth

