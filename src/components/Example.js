import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

class Example extends Component {
	constructor(props) {
		super(props);

		this.state = {content: ""};
	}

	componentWillMount() {
		fetch(`./markdown/example.md`)
			.then(response => response.text())
			.then(text => this.setState({content:text}))
	}

	render() {
		return (
			<div className="section-content">
				<h2>Example</h2>
				<div className="code-block"><ReactMarkdown source={this.state.content} /></div>
			</div>
		);
	}
}

export default Example;	