.PHONY: help

IMAGE := tamakiii-sandbox/hello-aws-cdk

help:
	@cat $(firstword $(MAKEFILE_LIST))

build: Dockerfile
	docker build -t $(IMAGE) .

bash: build
	docker run -it --rm -v $(PWD):/work -w /work $(IMAGE) $@