/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var Comment = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <div className="comment-item">
               This is a Comment
            </div>
        );
    }

});

module.exports = Comment;
