/** @jsx React.DOM */
var React = require('react/addons');

var Metadata = require('./metadata');
var MetaSocial = require('./metaSocial');

var Post = React.createClass({

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
    	var url = post.url;

    	var metadata = {
    		author: post.author,
    		section: post.subreddit,
    		timestamp: post.created,
    		points: post.score,
    		num_comments: post.num_comments,
    		permalink: post.permalink,
    		selftext: post.selftext
    	};

    	var metaSocial = {
    		num_comments: post.num_comments,
    		permalink: post.permalink
    	}

        var content = this.processContent(post);

        return (
            <div>
                <h3>{title}</h3>
                <Metadata data={metadata}/>
                    <a href={url} target="_blank"><img src={content} alt={title}/></a>
                <MetaSocial data={metaSocial}/>
            </div>
        );
    }

});

module.exports = Post;
