var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _post = [];

//Get list of reddit posts from server and return it to listing processing function
function _updatePost(postData) {
  console.log('in store', postData.post[0]);
  _post = postData.post[0];
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
    console.log('getting postData from store');
    return _post;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    // console.log('payload', payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.UPDATE_POST_DATA:
        console.log('got update post data event', payload.action.postData);
        _updatePost(payload.action.postData);
        break;
      case AppConstants.UPDATE_POST_DATA_2:
        console.log('got update post data event2', payload.action.postData);
        _updatePost(payload.action.postData);
        break;
    }

    PostStore.emitChange();

    return true;
  })
});

module.exports = PostStore;
