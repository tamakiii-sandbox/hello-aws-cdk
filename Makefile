.PHONY: help setup

AWS_PROFILE := default
AWS_REGION := ap-northeast-1

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: .env

.env:
	echo "AWS_PROFILE=$(AWS_PROFILE)" > $@
	echo "AWS_REGION=$(AWS_REGION)" > $@

clean:
	rm -rf .env
