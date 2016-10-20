(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/* eslint-disable */
var csInterface = new CSInterface();
/* eslint-enable */

var React = require('react');
var MainPanel = React.createClass({displayName: "MainPanel",

	testScript: function() {
		csInterface.evalScript("addDocument()");
	},

	saveCss: function() {
		csInterface.addEventListener('documentCreated', function(event) {
			console.log(event.data);
		});
		csInterface.evalScript("iterate()");
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "React Extension"), 
				React.createElement("button", {onClick: this.testScript}, "Test Script"), 
				React.createElement("p", null, "A Simple script to ensure the panel is working"), 
				React.createElement("br", null), 
				React.createElement("button", {onClick: this.saveCss}, "Log CSS"), 
				React.createElement("p", null, "Debugger console should list css for each layer. So our html panel now has access to this data. Now I need to export this css to a file and build an html doc containing divs with the same class identifiers as the CSS")
			)
		);
	}
});

module.exports = MainPanel;

},{"react":"react"}],2:[function(require,module,exports){

var React = require('react');
var ReactDOM = require('react-dom');
var MainPanel = require('./components/MainPanel.js');


ReactDOM.render(React.createElement(MainPanel, null), document.getElementById('app'));

},{"./components/MainPanel.js":1,"react":"react","react-dom":"react-dom"}]},{},[2]);
