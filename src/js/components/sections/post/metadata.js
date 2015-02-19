/** @jsx React.DOM */
var React = require('react/addons');

var Metadata = React.createClass({

    render: function () {
    	var metadata = this.props.data;
        return (
            <div className="metadata">
				{metadata.points} Points by {metadata.author} posted to <a href={metadata.section}>{metadata.section}</a> | <a href={metadata.permalink}>{metadata.num_comments} comments</a>
            </div>
        );
    }

});

module.exports = Metadata;
