/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../../libs/util');

var Comment = require('./Comment');

var Comments = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <div className="comments-container">
               <Comment/>
            </div>
        );
    }

});

module.exports = Comments;
