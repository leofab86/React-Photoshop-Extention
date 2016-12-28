
var React = require('react');
var ReactButton = require('./ReactButton');

var csInterface = new window.CSInterface();

var htmlTopPath = window.React.ApplicationPath + '/src/codesnippets/top.html';
var htmlBotPath = window.React.ApplicationPath + '/src/codesnippets/bottom.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;


var MainPanel = React.createClass({

	addDocument: function() {
		console.log(1);
		csInterface.evalScript("addDocument()");
		csInterface.addEventListener('test', function(event) {
			console.log(event.data);
		});

	},

	exportLayer: function () {
		getDestination(function(destination){
			csInterface.evalScript("exportLayer('" + destination + "', 'selectedLayer', 'undefined')");
			alert('Layer exported to ' + destination);
		});
		
	},

	exportWebsite: function() {
		var cssStore = [];
		var i=0;
		var cssdata = "";
		var body = '';
		var csspath = '';
		var htmlFinalPath = '';
		var text = '';

		getDestination(function(destination){
			var path = destination;
			
			csspath = path + '/stylesheet.css';
			htmlFinalPath = path + '/index.html';

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

			alert('React Panel about to run Iterate Script');
			csInterface.evalScript("iterate(activeDocument)");

		});
		
	},

	render: function() {
		return (
			<div>
				<h1>React Extension</h1>
				<button onClick={this.addDocument}>New Document</button>
				<br/><br/>				
				<button onClick={this.exportLayer}>Export Layer as PNG</button>
				<br/><br/>
				<button onClick={this.exportWebsite}>Export a Website</button>
				<br/><br/>
				<ReactButton/>
			</div>
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
