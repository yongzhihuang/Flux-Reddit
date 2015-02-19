/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var RightNav = React.createClass({

    render: function () {
        return (
			<div className="left-nav">
				<ul className="left-nav-menu">
	                <li><Link to="/Overview">Overview</Link></li>
	                <li><Link to="/section/nsfw">Sample</Link></li>
	                <li><Link to="/MenuItem3">Menu Item 3</Link></li>
	                <li><Link to="/MenuItem4">Menu Item 4</Link></li>
	                <li><Link to="/MenuItem5">Menu Item 5</Link></li>
	                <li><Link to="/MenuItem6">Menu Item 6</Link></li>
	                <li><Link to="/MenuItem7">Menu Item 7</Link></li>
	            </ul>
			</div>
        );
    }

});

module.exports = RightNav;