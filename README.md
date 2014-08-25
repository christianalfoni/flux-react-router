[![Build Status](https://travis-ci.org/christianalfoni/flux-react-router.svg?branch=master)](https://travis-ci.org/christianalfoni/flux-react-router)

## React Router

Part of [flux-react](https://github.com/christianalfoni/flux-react), the router is a simple HTML5 router that will cover most your needs. Read more about FLUX over at [Facebook Flux](http://facebook.github.io/flux/).

Download from **dist**: [ReactRouter.min.js](https://rawgithub.com/christianalfoni/flux-react-router/master/dist/ReactRouter.min.js) or install from npm with `npm install flux-react-router`.

### Scope
- Is a function that takes a hash of routes pointing to callbacks
- Alternatively a route can point to another route for redirect

### Example
```javascript
var React = require('react');
var Router = require('flux-react-router');
var App = require('./App.js');
var Posts = require('./Posts.js');
var Post = require('./Post.js');

Router({
	'/': function () {
		React.unmountComponentAtNode(document.body);
		React.renderComponent(<App/>, document.body);
	},
	'/posts': function () {
		React.unmountComponentAtNode(document.body);
		React.renderComponent(<Posts/>, document.body);
	},
	'/posts/{id}': function (params) {
		React.unmountComponentAtNode(document.body);
		React.renderComponent(<Post id={params.id}/>, document.body);	
	},
	'*': '/'
});

/* In other parts of your code */

// Go directly to new route
Router.goTo('/');

// Returns a function, so that on click it will trigger the route
<button onClick={Router.deferTo('/')}

```

## Contribute

### Develop
* Run `npm install`
* Run `gulp`
* Any changes to files in `app/` will be compiled to `dev/`

### Test
* Run `gulp test -'./tests/Route-test.js'
* Open the `test.html` file in your browser
* Any changes to files in `app/` and the test file will autoreload the browser

### Run test in terminal
* Run `npm test`
* Currently uses phantomJS, though you can use chrome
