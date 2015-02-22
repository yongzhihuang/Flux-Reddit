/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Metadata = require('./Metadata');
var MetaSocial = require('./MetaSocial');

var Util = require('../../libs/util');

var ListingItem = React.createClass({

    componentDidMount: function() {
        //$("img.lazy").show().lazyload();
    },

    render: function () {
        var post = this.props.post.data;

        //transoform url to our own
        var url = '/post' + post.permalink;
        var postMarkUp;

        switch (post.content.type) {
            case 'image':
                postMarkUp = (
                        <Link to={url} params={{postData: post}}>
                            <img className={post.imageClass} src={post.content.content} alt={post.title}/>
                        </Link>
                    )
                break;
            case 'youtube':
                postMarkUp = (
                        <Link to={url} params={{postData: post}}>
                            <img className={post.imageClass} src={post.content.content} alt={post.title}/>
                        </Link>
                    )
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
            <div>
                <h3><Link to={url} params={{postData: post}}>{post.title}</Link></h3>
                <Metadata data={post.metadata}/>
                    {postMarkUp}
                <MetaSocial data={post.metaSocial}/>
            </div>
        );
    }

});

module.exports = ListingItem;
