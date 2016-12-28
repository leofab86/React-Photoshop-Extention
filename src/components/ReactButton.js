var React = require('react');

var ReactButton = React.createClass({

	pressButton: function() {
		console.log('React Button!');
		alert('React Button!');

	},

	render: function() {
		return (
			<button onClick={this.pressButton}>React Button</button>
		);
	}
});

module.exports = ReactButton;