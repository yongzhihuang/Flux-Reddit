/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var CommentStore = require('../../stores/CommentStore');
var CommentActions = require('../../actions/CommentActions');

var Comment = require('./Comment');


function getComments() {
    return {
        comments: CommentStore.getComments()
    }
}

var Comments = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return getComments();
    },

    componentWillMount: function() {
        console.log('will mount comments',this.props.url);
        var url = this.props.url;
        CommentActions.getComments(url);
    },

    componentDidMount: function() {
        CommentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CommentStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        if (!this.isMounted()) {
            return;
        }
        this.setState(getComments());
    },

    render: function () {

        var comments = this.state.comments.map(function(comment, index) {
            return <Comment comment={comment.data} />
        });

        return (
            <div className="comments-container">
                {comments}
            </div>
        );
    }

});

module.exports = Comments;
