/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');


var CommentChild = React.createClass({
    mixins: [Router.State],

    render: function () {
    	//console.log(this.props.comment);
        var comment = this.props.comment;

        return (
            <div className="comment-child">
               <div className="comment-author">{comment.author}</div> <div className="comment-points">(comment.score)</div>:
               <p className="comment-body">{comment.body}</p>
            </div>
        );
    }

});

module.exports = CommentChild;
