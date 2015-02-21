var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');

var CHANGE_EVENT = "change";

var _comments = [];

//Get list of reddit posts from server and return it to listing processing function
function _updateCommentsData(comments) {
  //console.log('in store update post', postData.post[0]);
  //console.log('updating comment store', comments);
  _comments = _processComments(comments);
}

function _processComments(comments) {
  return comments;
}


var CommentStore = _.extend(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getComments: function() {
    //console.log('getting postData from store');
    return _comments;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    // console.log('payload', payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.UPDATE_COMMENTS_DATA:
        //console.log('got update post data event', payload.action.postData);
        _updateCommentsData(payload.action.comments);
        break;
    }

    CommentStore.emitChange();

    return true;
  })
});

module.exports = CommentStore;
