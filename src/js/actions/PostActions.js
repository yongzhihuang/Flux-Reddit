var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var PostActions = {
  getPostData: function (hash, urlPath) {
	_fetchPostData(hash, urlPath);
  },
  updatePostData: function(postData) {
  	console.log('about to send to dispatcher', postData);
  	AppDispatcher.handleViewAction({
        actionType: AppConstants.UPDATE_POST_DATA,
        postData: postData
    });
  }
};

function _fetchPostData(hash, urlPath) {

	$.ajax({
        type: "GET",
        url: "http://www.shareonfb.com/server/v2/getPosts.php",
        data: {
            hash: hash
        },
        success: function(response) {
            if (response === "Post Do Not Exist") {
                _fetchFromReddit(urlPath);
                return;
            }
            PostActions.updatePostData(response);
        },

        fail: function(error) {
            //Store error event goes here
            //console.log('error: ' + error);
        }
    }); //ajax   
}

function _fetchFromReddit(urlPath) {
	//Inserts into DB based on the path
	$.ajax({
        type: "GET",
        url: "http://www.reddit.com/" + urlPath + ".json?jsonp=?",
        dataType:"jsonp",
        success: function(response) {
            serializeRedditResponse(response);
        },

        fail: function(error) {
            console.log('error: ' + error);
       	}
    }); //ajax
}

function serializeRedditResponse(response) {
	var postData = response[0].data.children[0].data;
	var post = [];

	post.push({
		hash: postData.id,
	    title: postData.title,
	    over18: postData.over_18,
	    author: postData.author,
	    section: postData.subreddit,
	    content: '',
	    permalink: postData.permalink,
	    image: postData.url
	});

	PostActions.updatePostData(post);

	//insertToDb(post);
}

function insertToDb(postData) {
	$.ajax({
        type: "POST",
        url: "http://www.shareonfb.com/server/v2/insertPost.php",
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
            console.log(response);
        },

        fail: function(error) {
            console.log('error: ' + error);
       	}
    }); //ajax
}

module.exports = PostActions;
