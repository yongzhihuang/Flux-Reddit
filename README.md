React + Flux Boilerplate - Built with Flux and Reactjs
================

## Setup

Install dependencies:

`npm install`

Build + watch:

`gulp` then head over to `http://localhost:1337/`

Linting with jshint:

`gulp jshint`

##Test:
Testing is done with Jest, put tests in __test__ folder and then type `npm test`

##Production
files are built to dist directory, just upload the content there to a server and bam, it works!

##About Flux:
Read more about flux here: https://facebook.github.io/flux/docs/overview.html#content

Here's a tldr; of a sample Flux flow:

1. Component triggers an event, calls `AppActions.myEventNameHere(myPayloadVariable`);

2. `AppAction` has function to handle `myEventNameHere(myPayloadVariable)`, in it calls `AppDispatcher.handleViewAction` and passing in the action type(Which is one of the predefined AppConstants) and the payload `myPayloadVariable`

3. `AppDispatcher` has defined a function `handleViewAction` that takes an action, and calls `this.dispatch` and passing the action along

4. In `AppStore`, dispatcher registers the payload, and performs switch-case on the `AppConstant (event type)` and calls the necessary function as needed to perform the action.  Emitting an event as needed to tell the app what's going on
