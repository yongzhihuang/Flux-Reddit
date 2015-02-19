/** @jsx React.DOM */
var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var RightNav = require('./sections/RightNav');
var TopNav = require('./sections/TopNav');

var AppRoot = React.createClass({

    render: function () {
        return (
            <div>
                <TopNav />
                <div id="content">
                    <header>
                      <div className="container">
                        <div className="row">

                          <div className="col-lg-8 content-area">
                            <RouteHandler />
                          </div>

                          <div className="col-lg-4">
                            <RightNav />
                          </div>

                        </div>
                      </div>
                    </header>
                </div>
            </div>
        );
    }

});

module.exports = AppRoot;