/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TopNav = React.createClass({
		//<Link to="/overview"></link>
	getInitialState: function() {
      return {
      	refreshText: ''
      };
    },

	refreshStats: function() {
		var self = this;

		this.setState({refreshText: 'Refreshing...'});
		$.ajax('API END POINT')
	  		.done(function(response) {
	  		self.setState({refreshText: 'Success!'});
	  		window.location.reload();
	    	console.log('success', response);
	 	})
	  	.fail(function(err) {
	  		self.setState({refreshText: 'Ugh Oh Something went wrong!'});
	    	console.log('error', err);
	  	})
	},

    render: function () {
        return (
    		<div className="top-header">
    			<nav className="navbar navbar-default navbar-fixed-top">
	    			<div className="container">
		                <div className="navbar-header page-scroll">
			                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			                <span className="sr-only">Toggle navigation</span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			                </button>
			                <a className="navbar-brand" href="/" data-category="Menubar" data-event="clicked" data-value="Logo">Shareonfb</a>
		                </div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-left navbar-left-social">
								<li className="hidden">
									<a href="#page-top"></a>
								</li>
								<li key="topnav-popular" className="page-scroll">
									<Link to="/section/all">Popular</Link>
								</li>
								<li key="topnav-funny" className="page-scroll">
									<Link to="/section/funny">Funny</Link>
								</li>
								<li key="topnav-videos" className="page-scroll">
									<Link to="/section/videos">Videos</Link>
								</li>
								<li key="topnav-pics" className="page-scroll">
									<Link to="/section/pics">Pics</Link>
								</li>
								<li key="topnav-news" className="page-scroll">
									<Link to="/section/news">News</Link>
								</li>
								<li key="topnav-memes" className="page-scroll">
									<Link to="/section/memes">Memes</Link>
								</li>
								<li key="topnav-ask" className="page-scroll">
									<Link to="/section/askreddit">Ask</Link>
								</li>
								<li key="topnav-more" className="page-scroll">
									<Link to="/more">More</Link>
								</li>
							</ul>

							<ul className="nav navbar-nav navbar-right">
								<li className="page-scroll">
								<a className="nav-left-facebook" data-category="Menubar" data-event="clicked" data-value="Social: Facebook" href="https://www.facebook.com/realorfakenews"><i className="fa fa-facebook"></i></a>
								</li>
								<li className="page-scroll">
								<a className="nav-left-twitter" data-category="Menubar" data-event="clicked" data-value="Social: Twitter" href="https://www.twitter.com/shareonfb"><i className="fa fa-twitter"></i></a>
								</li>
								<li className="page-scroll">
								<a href="/login.php"><i className="fa fa-user"></i></a>
								</li>
							</ul>
		                </div>
	          		</div>
	          	</nav>
    		</div>
        );
    }

});

module.exports = TopNav;
