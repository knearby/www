start: ensure.dependencies.installed
	./node_modules/.bin/webpack-dashboard -- webpack-dev-server --config ./config/webpack.config.js --open

static: ensure.dependencies.installed
	firebase use development
	firebase serve

build: ensure.dependencies.installed
	./node_modules/.bin/cross-env WEBPACK_MODE=production webpack --config ./config/webpack.config.js

build.analyze: ensure.dependencies.installed
	./node_modules/.bin/cross-env WEBPACK_MODE=production WEBPACK_ANALYZE=true webpack --config ./config/webpack.config.js

deploy: build
	firebase use development
	firebase deploy

deploy.production: build
	firebase use production
	-firebase deploy
	firebase use development

ensure.dependencies.installed:
	npm install