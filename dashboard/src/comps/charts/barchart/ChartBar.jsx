import React from 'react';
import './chartbar.css';
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

export default function ChartBar(props) {
	const { data } = props;

	return (
		<div className="chart-bar small-text">
			<h2 className="chart-bar-title">Kapacitetsbehov</h2>
			<ResponsiveContainer width="85%" aspect={3 / 1}>
				<ComposedChart
					layout="vertical"
					data={data}
					margin={{
						top: 0,
						right: 20,
						bottom: 0,
						left: 60,
					}}
				>
					<CartesianGrid stroke="#f5f5f5" />
					<XAxis type="number" />
					<YAxis dataKey="name" type="category" scale="band" />
					<Tooltip />
					<Legend />
					<Bar dataKey="usedCap" barSize={15} fill="#8884d8" name="Schemalagd kapacitet (minuter)" />
					<Bar
						dataKey="availableCap"
						barSize={15}
						fill="#82ca9d"
						name="Tillgänglig kapacitet (minuter)"
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
