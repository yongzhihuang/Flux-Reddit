/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

//App specific routes
// var AppRoot = require('./components/AppRoot');
// var Overview = require('./components/sections/Overview');
var NotFound = require('./components/NotFound');

module.exports = (
	<Route name="app" path="/" handler={require('./components/AppRoot')}>
	    <DefaultRoute handler={require('./components/Listing/Listing')} />
	    <Route name="listing" path="/section/:section" handler={require('./components/Listing/Listing')} />
	    <Route name="post" path="/post/*" handler={require('./components/Post/Post')} />
	    <NotFoundRoute handler={NotFound}/>
	</Route>
);

