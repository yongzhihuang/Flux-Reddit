/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../../libs/util');

var PostStore = require('../../../stores/PostStore');
var PostActions = require('../../../actions/PostActions')

var Comments = require('../Comment/Comments');


function getPostData() {
    return {
        post: PostStore.getPostData()
    }
}

var Post = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return getPostData();
    },

    componentWillMount: function() {
        var urlPath = this.getParams().splat;
        var hash = urlPath.split('/')[3];

        PostActions.getPostData(hash, urlPath);
    },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        PostStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        if (!this.isMounted()) {
            return;
        }
        this.setState(getPostData());
    },

    
    componentWillReceiveProps: function() {
        var urlPath = this.getParams().splat;
        var hash = urlPath.split('/')[3];

        PostActions.getPostData(hash, urlPath);
        this.setState(getListing());
    },

    render: function () {
        console.log(this.state.post);
        return (
            <div>
               Post
               <Comments/>
            </div>
        );
    }

});

module.exports = Post;
