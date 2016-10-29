
var React = require('react');
var csInterface = new window.CSInterface();

  
var htmlTopPath = window.React.SystemPath+'/Adobe/CEP/extensions/React/src/codesnippets/top.html';
var htmlBotPath = window.React.SystemPath+'/Adobe/CEP/extensions/React/src/codesnippets/bottom.html';
var htmltop = window.cep.fs.readFile(htmlTopPath).data;
var htmlbot = window.cep.fs.readFile(htmlBotPath).data;




var MainPanel = React.createClass({

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

		csInterface.evalScript("exportLayer()");
		csInterface.addEventListener('exportInfo', function(event){
			csspath = event.data + '/stylesheet.css';
			htmlFinalPath = event.data + '/index.html';
		});

		csInterface.addEventListener('outputLayerCSS', function(event) {
			cssStore[i] = event.data;
			i++

			cssdata = cssdata + '\n' +event.data;
			window.cep.fs.writeFile(csspath, cssdata);

			var classId = event.data.split(/\.| /);

			body = body + "\t\t<div class='" + classId[1] + "'></div>\n";

			var htmlFinal = htmltop + body + htmlbot;

			window.cep.fs.writeFile(htmlFinalPath, htmlFinal);

		});

		csInterface.evalScript("iterate()");
		
	},

	render: function() {
		return (
			<div>
				<h1>React Extension</h1>
				<button onClick={this.addDocument}>New Document</button>
				<br/><br/>
				<button onClick={this.exportWebsite}>Export a Website</button>
			</div>
		);
	}
});

module.exports = MainPanel;
