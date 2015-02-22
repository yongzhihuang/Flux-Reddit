/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Util = require('../../libs/util');

var PostStore = require('../../stores/PostStore');
var PostActions = require('../../actions/PostActions')

var Metadata = require('../Listing/Metadata');
var MetaSocial = require('../Listing/MetaSocial');
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
    
    // componentWillReceiveProps: function() {
    //     this.setState({post:[]});
    //     var urlPath = this.getParams().splat;
    //     var hash = urlPath.split('/')[3];

    //     PostActions.getPostData(hash, urlPath);
    //     this.setState(getListing());
    // },

    render: function () {
        var post = this.state.post;

        //Show Loading spinner while posts are not loaded
        if (post.length === 0) {
            return (
                <div className="loading-spinner"><i className="fa fa-spinner fa-spin"></i></div>
            )
        }

        //transoform url to our own
        var url = '/post' + post.permalink;
        var postMarkUp;

        switch (post.content.type) {
            case 'image':
                postMarkUp = <img className={post.imageClass} src={post.content.content} alt={post.title}/>
                break;
            case 'youtube':
                postMarkUp = <img className={post.imageClass} src={post.content.content} alt={post.title}/>
                break;
            case 'self':
                postMarkUp = <p className="selftext">{post.content.content} <Link to={url}>Read More</Link></p>
                break;
            default:
                postMarkUp = (
                        <div>
                            <p className="source"><a href={post.content.content} target="_blank">Source</a></p>
                        </div>
                    )
        }
        
        return (
            <div className="post-container">
               <h3>{post.title}</h3>
               <Metadata data={post.metadata}/>
                {postMarkUp}
               <MetaSocial data={post.metaSocial}/>
               <Comments url={post.permalink}/>
            </div>
        );
    }

});

module.exports = Post;
