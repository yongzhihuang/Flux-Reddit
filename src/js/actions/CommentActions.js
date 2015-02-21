var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var CommentActions = {
  getComments: function (url) {
    //Retrieves post from server data based on hash
	   _fetchComments(url);
  },

  updateCommentsData: function(comments) {
  	AppDispatcher.handleViewAction({
        actionType: AppConstants.UPDATE_COMMENTS_DATA,
        comments: comments
    });
  }

};

function _fetchComments(url) {
console.log('gonna fetch comment from', url);
    //Looks at our server to see if post with this hash exists
	// $.ajax({
 //        type: "GET",
 //        url: "http://www.shareonfb.com/server/v2/getPostsV2.php",
 //        data: {
 //            hash: hash
 //        },
 //        success: function(response) {
 //            if (response === "Post Do Not Exist") {
 //                //Post doesn't exist, call our api to store the post and return it
 //                _fetchFromReddit(urlPath);
 //                return;
 //            }

 //            //Data exists, send updateCommentsData to dispatcher
 //            CommentActions.updateCommentsData(response);
 //        },

 //        fail: function(error) {
 //            //Store error event goes here
 //            //console.log('error: ' + error);
 //        }
 //    }); 

  CommentActions.updateCommentsData(['comment1', 'comment 2'])
}

function _fetchFromReddit(urlPath) {
	//Inserts into DB based on the path
	$.ajax({
        type: "GET",
        url: "http://www.reddit.com/" + urlPath + ".json?jsonp=?",
        dataType:"jsonp",
        success: function(response) {
            //console.log('Post not found, fetching from reddit, heres data', response);
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
        score: postData.score,
        comments: postData.num_comments,
        selftext: postData.selftext,
	    content: '',
	    permalink: postData.permalink,
	    image: postData.url
	});

    //console.log('serializing data from reddit, calling updateCommentsData with post:', post);
	CommentActions.updateCommentsData(post);
	CommentActions.insertPostToDb(post);
}

module.exports = CommentActions;
