current_version:=$(shell node -e "console.log(require('./package.json').version);")

build: linter
	rm -rf ./build
	./node_modules/.bin/tsc
	cp README.md package.json .npmignore ./build/

linter:
	./node_modules/.bin/tslint --project .

publish:
	cd ./build && npm publish --tag=stable

unpublish:
	cd ./build && npm unpublish --force lazy-facet@$(current_version)

republish: unpublish publish
