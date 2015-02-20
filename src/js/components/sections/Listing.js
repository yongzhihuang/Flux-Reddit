/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');

var ListingStore = require('../../stores/listing-store');
var ListingActions = require('../../actions/listing-actions');

var ListingItem = require('./Listing/ListingItem');

function getListing() {
    return {
        posts: ListingStore.getListing(),
        section: ''
    }
}

var Listing = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return getListing();
    },

    componentWillMount: function() {
        var section = this.getParams().section || 'all';
        ListingActions.getListing(section);
    },

    componentDidMount: function() {
        ListingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ListingStore.removeChangeListener(this._onChange);
    },

    componentWillReceiveProps: function() {
        var section = this.getParams().section || 'all';
        ListingActions.getListing(section);
        this.setState(getListing());
    },

    _onChange: function() {
        if (!this.isMounted()) {
            return;
        }
        this.setState(getListing());
    },

    preprocessPosts: function(posts) {
        //clean up urls for images and videos
        _.each(posts, function(post, key) {
          if (post.data.url.indexOf('imgur.com') !== -1) {
            var imgurHash = /imgur.com\/(.*)/ig.exec(post.data.url)[1];
            post.data.url = 'http://i.imgur.com/' + imgurHash + '.png';
          } else if (post.data.url.indexOf('youtube') !== -1) {
            var videoId = post.data.url.match(/v=([^&]*)/);
            if (videoId && videoId[1]) {
              videoId = videoId[1];
              post.data.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
              post.data.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg'; 
            }
          } else if (post.data.url.indexOf('youtu.be') !== -1 && post.data.url.indexOf('feature=youtu.be') == -1) {
            var split = post.data.url.split('/');
            var videoId = split[split.length-1].replace(/(\?.*)/,'');
            post.data.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
            post.data.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
          }
        });

        return posts;
    },

    render: function () {
        var sectionFromUrlParameter = this.getParams().section;
        var currentSection = (sectionFromUrlParameter === 'all') ? 'Popular' : sectionFromUrlParameter;

        var posts = this.preprocessPosts(this.state.posts);

        var listing = posts.map(function(post, index){
            return (
                <div className="post-container">
                    <ListingItem post={post}/>
                </div>
            )
        });

        return (
          <div className="col-xs-6 col-md-12">
            {listing}
          </div>
        );
    }

});

module.exports = Listing;
