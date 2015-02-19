/** @jsx React.DOM */
var React = require('react/addons');

var MetaSocial = React.createClass({

    render: function () {
    	var metaSocial = this.props.data;
        return (
            <div className="meta-social">
				<a className="button-general" href={metaSocial.permalink}>{metaSocial.num_comments} Comments</a>
				<div className="social-button-container">
					<a className="btn tweet-button"><i className="fa fa-twitter"/> Tweet</a> <a className="btn facebook-button"><i className="fa fa-facebook"/> Share</a>
				</div>
            </div>
        );
    }

});

module.exports = MetaSocial;