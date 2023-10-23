install: \
	node_modules

init/%:
	mkdir $(@F) && cd $(@F) && \
		npx --no-install cdk init app --language=typescript

node_modules:
	npm install

clean:
	rm -rf node_modules

