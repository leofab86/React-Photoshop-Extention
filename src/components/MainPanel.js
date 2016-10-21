
var React = require('react');
var csInterface = new window.CSInterface();

var cssStore = [];
var i=0;
var cssdata = "";  
var csspath = window.React.SystemPath+'/Adobe/CEP/extensions/React/exports/test.css';
var htmlTopPath = window.React.SystemPath+'/Adobe/CEP/extensions/React/src/codesnippets/top.html';
var htmlBotPath = window.React.SystemPath+'/Adobe/CEP/extensions/React/src/codesnippets/bottom.html';
var htmlFinalPath = window.React.SystemPath+'/Adobe/CEP/extensions/React/exports/final.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;
var body = '';



var MainPanel = React.createClass({

	testScript: function() {
		csInterface.evalScript("addDocument()");
	},

	saveCss: function() {
		csInterface.addEventListener('documentCreated', function(event) {
			cssStore[i] = event.data;
			i++

			cssdata = cssdata + '\n' +event.data;
			window.cep.fs.writeFile(csspath, cssdata);

			var classId = event.data.split(/\.| /);

			body = body + "\n<div class='" + classId[1] + "'></div>";

			var htmlFinal = htmltop + body + '\n' + htmlbot;

			window.cep.fs.writeFile(htmlFinalPath, htmlFinal);


		});
		csInterface.evalScript("iterate()");
		
	},

	render: function() {
		return (
			<div>
				<h1>React Extension</h1>
				<button onClick={this.testScript}>New Document</button>
				<br/><br/>
				<button onClick={this.saveCss}>Export to HTML / CSS</button>
				<p>Files exported to export folder</p>
			</div>
		);
	}
});

module.exports = MainPanel;
