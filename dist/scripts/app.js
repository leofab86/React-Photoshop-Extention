(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react');

var Greeting = React.createClass({displayName: "Greeting",
	render: function() {
		return (
			React.createElement("div", {className: "jumbotron"}, 
				React.createElement("p", null, "Hello, Universe")
			)
		);
	}
});

module.exports = Greeting;

},{"react":"react"}],2:[function(require,module,exports){
var React = require('react');
var ReactDOM = require('react-dom');
var Greeting = require('./components/greeting.js');

ReactDOM.render(React.createElement(Greeting, null), document.getElementById('app'));

},{"./components/greeting.js":1,"react":"react","react-dom":"react-dom"}]},{},[2]);
