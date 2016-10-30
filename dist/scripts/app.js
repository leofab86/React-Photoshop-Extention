(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var React = require('react');
var csInterface = new window.CSInterface();

var htmlTopPath = window.React.ApplicationPath + '/src/codesnippets/top.html';
var htmlBotPath = window.React.ApplicationPath + '/src/codesnippets/bottom.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;



var MainPanel = React.createClass({displayName: "MainPanel",

	addDocument: function() {
		csInterface.evalScript("addDocument()");

	},

	exportWebsite: function() {
		var cssStore = [];
		var i=0;
		var cssdata = "";
		var body = '';
		var csspath = '';
		var htmlFinalPath = '';
		var text = '';

		csInterface.evalScript("exportLayer()");
		
		csInterface.addEventListener('exportInfo', function(event){
			csspath = event.data + '/stylesheet.css';
			htmlFinalPath = event.data + '/index.html';
		});

		csInterface.addEventListener('outputText', function(event) {
			text = event.data;
		});

		csInterface.addEventListener('outputLayerCSS', function(event) {
			cssStore[i] = event.data;
			i++

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
		
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "React Extension"), 
				React.createElement("button", {onClick: this.addDocument}, "New Document"), 
				React.createElement("br", null), React.createElement("br", null), 
				React.createElement("button", {onClick: this.exportWebsite}, "Export a Website")
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
