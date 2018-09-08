import React, { Component } from "react";

class Configuration extends Component {
	render() {
		return (
			<div className="section-content">
				<h2>Configuration</h2>
				<div>
					<p>Props that can be passed to Component <b>ScrollspyNav</b> for configuration.</p>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Description</th>
								<th>Example Value</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>scrollTargetIds</td>
								<td>Array</td>
								<td>List of scroll targets ids</td>
								<td>["section_1", "section_2", "section_3"]</td>
							</tr>
							<tr>
								<td>activeNavClass</td>
								<td>String</td>
								<td>Class name for styling the nav link that's currently active</td>
								<td>"is-active"</td>
							</tr>
							<tr>
								<td>router</td>
								<td>String</td>
								<td>The name of router used in react app if any</td>
								<td>"HashRouter"</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Configuration;