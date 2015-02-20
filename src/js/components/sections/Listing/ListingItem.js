/** @jsx React.DOM */
var React = require('react/addons');

var Metadata = require('./Metadata');
var MetaSocial = require('./MetaSocial');

var Util = require('../../../libs/util');

var Router = require('react-router');
var Link = Router.Link;

var ListingItem = React.createClass({

    updateImagePosition: function(top, height) {
        // image is already displayed, no need to check anything
        if (this.state.showImage) {
          return;
        }

        // update showImage state if component element is in the viewport
        var min = this.props.viewport.top;
        var max = this.props.viewport.top + this.props.viewport.height;

        if ((min <= (top + height) && top <= (max - 300))) {
          this.setShowImage(true);
        }
    },

    processContent: function(post) {
        //Scenarios:
        //1. Image (gif, jpg, png)
        //2. Videos (youtube, vimeo, etc)
        //3. Text (self posts)
        //4. Gify

        var content;
        var type;

        if (post.url.indexOf('.jpg') !== -1 || post.url.indexOf('.png') !== -1 || post.url.indexOf('.gif') !== -1) {
            type = 'image';
            content = post.url;
        } else if (post.ytThumb) {
            type = 'youtube';
            content = post.ytThumb;
        } else if (post.is_self) {
            type = 'self';
            content = post.selftext;
        } else {
            type = 'other';
            content = post.url;
        }

        return {
            type: type,
            content: content
        };
    },

    componentDidMount: function() {
        //$("img.lazy").show().lazyload();
    },

    componentWillUnmount: function() {
        this.props.post = null;
    },

    render: function () {
        var post = this.props.post.data;

        var title = post.title;
        var url = '/post' + post.permalink;
        var imageClass = (post.over_18) ? 'lazy nsfw' : 'lazy';

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
        var listingContent;

        switch (content.type) {
            case 'image':
                listingContent = <Link to={url}><img className={imageClass} src={content.content} alt={title}/></Link>
                break;
            case 'youtube':
                listingContent = <Link to={url}><img className={imageClass} src={content.content} alt={title}/></Link>
                break;
            case 'self':
                listingContent = <p>{content.content} <Link to={url}>Read More</Link></p>
            case 'other':
                listingContent = <p><Link to={url}>{content.content}</Link></p>
        }

        return (
            <div>
                <h3><Link to={url}>{title}</Link></h3>
                <Metadata data={metadata}/>
                    {listingContent}
                <MetaSocial data={metaSocial}/>
            </div>
        );
    }

});

module.exports = ListingItem;
