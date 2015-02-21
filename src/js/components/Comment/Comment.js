/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var CommentChild = require('./CommentChild');

var Comment = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <div className="comment-node">
               <div className="comment-author">Deathbylight</div> <div className="comment-points">(3423)</div>:
               <p className="comment-body">This is a great post I love this post, can you post some moar plox? Thanks kthx bye.</p>
               <CommentChild/>
            </div>
        );
    }

});

module.exports = Comment;
