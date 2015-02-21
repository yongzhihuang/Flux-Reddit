/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var MetaSocial = React.createClass({

    render: function () {
    	var metaSocial = this.props.data;
        var commentLink = '/post' + metaSocial.permalink;
        return (
            <div className="meta-social">
                 <Link to={commentLink} className="button-general">{metaSocial.num_comments} Comments</Link>
				<div className="social-button-container">
					<a className="btn tweet-button"><i className="fa fa-twitter"/> Tweet</a> <a className="btn facebook-button"><i className="fa fa-facebook"/> Share</a>
				</div>
            </div>
        );
    }

});

module.exports = MetaSocial;
