/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

//App specific routes
// var AppRoot = require('./components/AppRoot');
// var Overview = require('./components/sections/Overview');
var NotFound = require('./components/sections/NotFound');

module.exports = (
	<Route name="app" path="/" handler={require('./components/AppRoot')}>
	    <DefaultRoute handler={require('./components/sections/Listing')} />
	    <Route name="Listing" path="/section/:section" handler={require('./components/sections/Listing')} />
	    <Route name="Post" path="/post/*" handler={require('./components/sections/Post/Post')} />
	    <NotFoundRoute handler={NotFound}/>
	</Route>
);

