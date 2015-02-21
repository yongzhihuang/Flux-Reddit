/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var Comment = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <div className="comment-child">
               This is a Comment Child
            </div>
        );
    }

});

module.exports = Comment;
