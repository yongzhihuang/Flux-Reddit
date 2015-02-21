var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _listing = [];
var _infiniteScrollMark = 0;

//Get list of reddit posts from server and return it to listing processing function
function _setListing(posts) {
  _listing = _preprocessPosts(posts);
}

//Do any data transformation needed for images/videos/selftext/etc
function _preprocessPosts(posts) {

  //clean up urls for images and videos
  _.each(posts, function(post, key) {

    var post = post.data;
    if (post.url.indexOf('imgur.com') !== -1) {
      var imgurHash = /imgur.com\/(.*)/ig.exec(post.url)[1];

      if ((post.url.indexOf('.jpg') === -1) && (post.url.indexOf('.png') === -1) && (post.url.indexOf('.gifv') === -1)) {
          post.url = 'http://i.imgur.com/' + imgurHash + 'l' + '.png';
      } else if ((post.url.indexOf('.gif') === -1) && (post.url.indexOf('.gifv') === -1)){
          //imgurHash = imgurHash.split('.')[0] + 'l.png';
          //TODO: Make original OK image smaller preset too
          post.url = 'http://i.imgur.com/' + imgurHash;
      }

      //console.log(post.url);
    } else if (post.url.indexOf('youtube') !== -1) {
      var videoId = post.url.match(/v=([^&]*)/);
      if (videoId && videoId[1]) {
        videoId = videoId[1];
        post.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
        post.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg'; 
      }
    } else if (post.url.indexOf('youtu.be') !== -1 && post.url.indexOf('feature=youtu.be') == -1) {
      var split = post.url.split('/');
      var videoId = split[split.length-1].replace(/(\?.*)/,'');
      post.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
      post.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
    }

    //Determine content type for the post
    var content, type;

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

    post.content = {
        type: type,
        content: content
    };


    //Detemine meta info
    post.imageClass = (post.over_18) ? 'lazy nsfw' : 'lazy';

    post.metadata = {
        author: post.author,
        section: post.subreddit,
        timestamp: post.created,
        points: post.score,
        num_comments: post.num_comments,
        permalink: post.permalink,
        selftext: post.selftext,
        hash: post.id,
    };

    post.metaSocial = {
        num_comments: post.num_comments,
        permalink: post.permalink
    }

  });

  return posts;
}

var ListingStore = _.extend(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getListing: function(start, end) {
    return _listing;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    // console.log('payload', payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.SEND_LISTING:
        _setListing(payload.action.posts);
        break;
    }

    ListingStore.emitChange();

    return true;
  })
});

module.exports = ListingStore;
