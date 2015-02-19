/** @jsx React.DOM */
var React = require('react/addons');
var AppStore = require('../../../stores/app-store');

function cartItems() {
  return {items: AppStore.getCart()}
}

var Checkout = React.createClass({
  getInitialState: function() {
    return cartItems();
  },

  componentWillMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(cartItems());
  },

  render: function() {
    var listItems = this.props.items.map(function(item, i) {
      return <li key={"selectedItem" + i}>{item.title}</li>
    });

    var count = listItems.length;
    
    return (
      <div>
        <ul>
          {listItems}
        </ul>
        <span>{count}</span>
      </div>
    );
  }
});

module.exports = Checkout;  