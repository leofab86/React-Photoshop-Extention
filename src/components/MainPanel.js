
var React = require('react');

var csInterface = new window.CSInterface();

var htmlTopPath = window.React.ApplicationPath + '/src/codesnippets/top.html';
var htmlBotPath = window.React.ApplicationPath + '/src/codesnippets/bottom.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;


var MainPanel = React.createClass({

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
			<div>
				<h1>React Extension</h1>
				<br/><br/>				
				<button onClick={this.exportLayer}>Export Layer as PNG</button>
				<br/><br/>
				<button onClick={this.exportWebsite}>Export a Website</button>
				<br/><br/>
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
