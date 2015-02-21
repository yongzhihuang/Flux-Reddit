var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');

var CHANGE_EVENT = "change";

var _post = [];

//Get list of reddit posts from server and return it to listing processing function
function _updatePost(postData) {
  //console.log('in store update post', postData.post[0]);
  _post = _processPost(postData.post[0]);
}

function _processPost(post) {

  if (post.image.indexOf('imgur.com') !== -1) {
    var imgurHash = /imgur.com\/(.*)/ig.exec(post.image)[1];

    if ((post.image.indexOf('.jpg') === -1) && (post.image.indexOf('.png') === -1) && (post.image.indexOf('.gifv') === -1)) {
        post.image = 'http://i.imgur.com/' + imgurHash + 'l' + '.png';
    } else if ((post.image.indexOf('.gif') === -1) && (post.image.indexOf('.gifv') === -1)){
        //imgurHash = imgurHash.split('.')[0] + 'l.png';
        //TODO: Make original OK image smaller preset too
        post.image = 'http://i.imgur.com/' + imgurHash;
    }

    //console.log(post.image);
  } else if (post.image.indexOf('youtube') !== -1) {
    var videoId = post.image.match(/v=([^&]*)/);
    if (videoId && videoId[1]) {
      videoId = videoId[1];
      post.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
      post.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg'; 
    }
  } else if (post.image.indexOf('youtu.be') !== -1 && post.image.indexOf('feature=youtu.be') == -1) {
    var split = post.image.split('/');
    var videoId = split[split.length-1].replace(/(\?.*)/,'');
    post.embed = '<iframe width="300" height="210" src="http://www.youtube.com/embed/' +videoId + '" frameborder="0" allowfullscreen></iframe>';
    post.ytThumb = 'http://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  }

  //Determine content type for the post
  var content, type;

  if (post.image.indexOf('.jpg') !== -1 || post.image.indexOf('.png') !== -1 || post.image.indexOf('.gif') !== -1) {
      type = 'image';
      content = post.image;
  } else if (post.ytThumb) {
      type = 'youtube';
      content = post.ytThumb;
  } else if (post.is_self) {
      type = 'self';
      content = post.selftext;
  } else {
      type = 'other';
      content = post.image;
  }

  post.content = {
      type: type,
      content: content
  };

  //Detemine meta info
  post.imageClass = (post.over_18) ? 'lazy nsfw' : 'lazy';


  return post;
}

function _insertPostToDB(postData) {
  //console.log('insert post to DB');
  _post = _processPost(postData);
  
  $.ajax({
        type: "POST",
        url: "http://www.shareonfb.com/server/v2/insertPostV2.php",
        data: {
            hash: postData.hash,
            title: postData.title,
            over18: postData.over_18,
            author: postData.author,
            section: postData.section,
            content: postData.content,
            permalink: postData.permalink,
            image: postData.image
        },
        success: function(response) {
            console.log('successfully inserted to db', response);
        },

        fail: function(error) {
            console.log('error: ' + error);
        }
    }); //ajax
}

var PostStore = _.extend(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getPostData: function() {
    //console.log('getting postData from store');
    return _post;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    // console.log('payload', payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.UPDATE_POST_DATA:
        //console.log('got update post data event', payload.action.postData);
        _updatePost(payload.action.postData);
        break;
      case AppConstants.INSERT_POST_DATA:
        //console.log('got insert to db event', payload.action.postData);
        _insertPostToDB(payload.action.postData[0]);
        break;
    }

    PostStore.emitChange();

    return true;
  })
});

module.exports = PostStore;
