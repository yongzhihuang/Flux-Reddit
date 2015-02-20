/** @jsx React.DOM */
var React = require('react/addons');

var Metadata = require('./Metadata');
var MetaSocial = require('./MetaSocial');

var Util = require('../../../libs/util');

var Router = require('react-router');
var Link = Router.Link;

var ListingItem = React.createClass({

    processContent: function(post) {
        //Scenarios:
        //1. Image (gif, jpg, png)
        //2. Videos (youtube, vimeo, etc)
        //3. Text (self posts)
        //4. Gify

        if (post.url.indexOf('.jpg') !== -1 || post.url.indexOf('.png') !== -1 || post.url.indexOf('.gif') !== -1) {
            var thumbHolder = 'http://i.imgur.com/sKRZ8U0.png';
            thumbHolder = post.url;
        } else if (post.ytThumb) {
            thumbHolder = post.ytThumb;
        }

        return thumbHolder;
    },

    render: function () {
        var post = this.props.post.data;

        var title = post.title;
        var url = '/post' + post.permalink;

        var metadata = {
            author: post.author,
            section: post.subreddit,
            timestamp: post.created,
            points: post.score,
            num_comments: post.num_comments,
            permalink: post.permalink,
            selftext: post.selftext,
            hash: post.id,
        };

        var metaSocial = {
            num_comments: post.num_comments,
            permalink: post.permalink
        }

        var content = this.processContent(post);

        return (
            <div>
                <h3><Link to={url}>{title}</Link></h3>
                <Metadata data={metadata}/>
                <Link to={url}><img src={content} alt={title}/></Link>
                <MetaSocial data={metaSocial}/>
            </div>
        );
    }

});

module.exports = ListingItem;
