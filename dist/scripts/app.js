(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var React = require('react');

var csInterface = new window.CSInterface();

var htmlTopPath = window.React.ApplicationPath + '/src/codesnippets/top.html';
var htmlBotPath = window.React.ApplicationPath + '/src/codesnippets/bottom.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;


var MainPanel = React.createClass({displayName: "MainPanel",

	exportLayer: function () {
		getDestination(function(destination){
			csInterface.evalScript("exportLayer('" + destination + "', 'selectedLayer', 'undefined')");
			alert('Layer exported to ' + destination);
		});
		
	},

	exportWebsite: function() {
		var cssdata = "div {white-space: pre-wrap;}\n";
		var body = '';
		var csspath = '';
		var htmlFinalPath = '';
		var text = '';

		getDestination(function(destination){
			
			csspath = destination + '/stylesheet.css';
			htmlFinalPath = destination + '/index.html';

			csInterface.addEventListener('outputText', function(event) {
				text = event.data;
			});

			csInterface.addEventListener('outputLayerCSS', function(event) {

				cssdata = cssdata + '\n' +event.data;
				window.cep.fs.writeFile(csspath, cssdata);

				var classId = event.data.match(/\.(.*) /g);

				for (var x = 0; x < classId.length; x++) {
					body = body + "\t\t<div class='" + classId[x].slice(1, -1) + "'>" + text + "</div>\n";	
				}

				text = '';

				var htmlFinal = htmltop + body + htmlbot;

				window.cep.fs.writeFile(htmlFinalPath, htmlFinal);

			});

			csInterface.evalScript("iterate(activeDocument)");

		});
		
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "React Extension"), 
				React.createElement("br", null), React.createElement("br", null), 				
				React.createElement("button", {onClick: this.exportLayer}, "Export Layer as PNG"), 
				React.createElement("br", null), React.createElement("br", null), 
				React.createElement("button", {onClick: this.exportWebsite}, "Export a Website"), 
				React.createElement("br", null), React.createElement("br", null)
			)
		);
	}
});

module.exports = MainPanel;


function getDestination (callback) {
	csInterface.evalScript("destination()", function(result){
			
		if (result === 'cancel') {
			console.log('no destination given');
			return;
		}

		console.log('destination recieved:');
		console.log(result);
		
		callback(result);

	})
}

},{"react":"react"}],2:[function(require,module,exports){

var React = require('react');
var ReactDOM = require('react-dom');
var MainPanel = require('./components/MainPanel.js');


ReactDOM.render(React.createElement(MainPanel, null), document.getElementById('app'));

},{"./components/MainPanel.js":1,"react":"react","react-dom":"react-dom"}]},{},[2]);
