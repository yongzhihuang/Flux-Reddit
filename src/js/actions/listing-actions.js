var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');


var ListingActions = {
  getListing: function (section) {
	_fetchListingDataFromServer(section);
  },
  sendListingPosts: function(posts) {
  	AppDispatcher.handleViewAction({
        actionType: AppConstants.SEND_LISTING,
        posts: posts
    });
  }
};

//Fetch posts from api based on a section
//When done send a signal to dispatcher
//TODO: on error send to dispatcher also
function _fetchListingDataFromServer(section) {
	//empty it out first to reduce that laggy effecft
	ListingActions.sendListingPosts([]);
	$.ajax({
		type: "GET",
		url: "http://www.shareonfb.com/server/v2/fetchRedditJson.php?r=" + section
	})
	.done(function(response) {
		ListingActions.sendListingPosts(response.data.children);
	});
}

module.exports = ListingActions;
