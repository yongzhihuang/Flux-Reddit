/** @jsx React.DOM */
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');

var ListingStore = require('../../stores/listing-store');
var ListingActions = require('../../actions/listing-actions');

var ListingItem = require('./ListingItem');

function getListing() {
    return {
        posts: ListingStore.getListing(),
        section: '',
        loaded: false
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

        //Clear anything that's posts state before repopulating to avoid image flickr
        this.setState({posts: []});

        //Defaults to 'all' subreddit
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

    render: function () {
        var self = this;
        
        //Show Loading spinner while posts are not loaded
        if (!this.state.posts.length) {
            return (
                <div className="loading-spinner"><i className="fa fa-spinner fa-spin"></i></div>
            )
        }

        //Create ListingItem for each post in the data
        var listing = this.state.posts.map(function(post, index){
            return (
                <div className="post-container" key={'post' + index}>
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
