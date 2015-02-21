/** @jsx React.DOM */
var React = require('react/addons');

var NotFound = React.createClass({
	getDefaultProps: function() {
		return {
			foo: 'bar'
		}
	},

	fetchData: function() {

	},
	
    render: function () {
        return (
            <div>
                Not Found
            </div>
        );
    }

});

module.exports = NotFound;
