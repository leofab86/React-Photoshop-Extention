
/* eslint-disable */
var csInterface = new CSInterface();
/* eslint-enable */

var React = require('react');
var MainPanel = React.createClass({

	addDocument: function() {
		csInterface.evalScript("addDocument()");
	},

	saveCss: function() {
		csInterface.addEventListener('documentCreated', function(event) {
			console.log(event.data);
		});
		csInterface.evalScript("saveCss()");
	},

	render: function() {
		return (
			<div>
				<h1>React Extension</h1>
				<button onClick={this.addDocument}>Add Document</button>
				<p>A Simple script to ensure the panel is working</p>
				<br/>
				<button onClick={this.saveCss}>Log CSS</button>
				<p>Highlight a layer, click here and check the debugger console. If it works then we have access to the css! Now I need to export this css to a file and build an html doc containing divs with the same class identifiers as the CSS</p>
			</div>
		);
	}
});

module.exports = MainPanel;
