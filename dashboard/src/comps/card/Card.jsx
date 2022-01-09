import React from 'react';

import './card.css';

export default function Card(props) {
	let bg = '';

	if (props.bg) {
		bg = props.bg;
	}

	console.log(props);

	return (
		<div className="card" style={{ backgroundColor: bg }}>
			<h3>{props.loadNum}%</h3>
			<span>{props.group}</span>
		</div>
	);
}
