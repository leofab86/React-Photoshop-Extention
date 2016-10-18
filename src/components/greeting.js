var React = require('react');

var Greeting = React.createClass({
	render: function() {
		return (
			<div className='jumbotron'>
				<p>Hello, Universe</p>
			</div>
		);
	}
});

module.exports = Greeting;
