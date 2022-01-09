import React from 'react';

import Card from '../card/Card';
import './cards.css';

export default function Cards(props) {
	console.log(props.loads);

	return (
		<div className="cards-container">
			<h2 className="cards-title">Beläggning</h2>
			{props.loads.map((load) => (
				<Card loadNum={load.loadNum} group={load.group} bg={load.bg} />
			))}
		</div>
	);
}
