/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Metadata = React.createClass({

    render: function () {
    	var metadata = this.props.data;
        return (
            <div className="metadata">
				{metadata.points} Points by {metadata.author} posted to {' '}
				<Link to={'/section/' + metadata.section}>{metadata.section}</Link> | {' '} 
				<Link to={metadata.permalink}>{metadata.num_comments} comments</Link>
            </div>
        );
    }

});

module.exports = Metadata;
