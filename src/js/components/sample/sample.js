/** @jsx React.DOM */
var React = require('react/addons'), 
    Checkout = require('./checkout');

var AppActions = require('../../actions/app-actions');

var Sample = React.createClass({

  onSelectItem: function(index) {

    var item = this.props.items[index];

    //Pass to flux action handler
    AppActions.sampleAction(item);

    this.setState({
      selectedItems: this.state.selectedItems.concat(item)
    });
  },

  getInitialState: function() {
    return {
      selectedItems: [] 
    };
  },

  getDefaultProps: function() {
    return {
      items: [{ title: 'Bread' }, { title: 'Milk' }, { title: 'Cheese' }]  
    };
  },

  render: function() {
    var listItems = this.props.items.map(function(item, i) {
      return <li key={"item" + i} onClick={this.onSelectItem.bind(null, i)}>{item.title}</li>
    }.bind(this));

    return (
      <div>
        <ul>{listItems}</ul>

        <Checkout items={this.state.selectedItems} />
      </div>
    );
  }
});

module.exports = Sample;  