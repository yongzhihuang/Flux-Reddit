/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var CommentChild = require('./CommentChild');

var Comment = React.createClass({

    render: function () {

        //console.log(this.props.comment);
        var comment = this.props.comment;
        var commentChildren = 'no child';

        //var commentChild = (comment.replies.data.children) ? <CommentChild replies={comment.replies.data.children}/> : '';

        if (comment.replies && comment.replies.data.children) {
          commentChildren = comment.replies.data.children.map(function(commentChild, index) {
            return <CommentChild comment={commentChild.data}/>
          })
        }

        return (
            <div className="comment-node">
               <div className="comment-author">{comment.author}</div> <div className="comment-points">({comment.score})</div>:
               <p className="comment-body">{comment.body}</p>
               {commentChildren}
            </div>
        );
    }

});

module.exports = Comment;
