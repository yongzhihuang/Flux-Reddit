var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _listing = [];

//Get list of reddit posts from server and return it to listing processing function
function _setListing(posts) {
  _listing = posts;
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

  getListing: function() {
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
