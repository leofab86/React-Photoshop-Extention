
/* eslint-disable */
var csInterface = new CSInterface();
/* eslint-enable */

var React = require('react');
var MainPanel = React.createClass({

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
			<div>
				<h1>React Extension</h1>
				<button onClick={this.testScript}>Test Script</button>
				<p>A Simple script to ensure the panel is working</p>
				<br/>
				<button onClick={this.saveCss}>Log CSS</button>
				<p>Debugger console should list css for each layer. So our html panel now has access to this data. Now I need to export this css to a file and build an html doc containing divs with the same class identifiers as the CSS</p>
			</div>
		);
	}
});

module.exports = MainPanel;
