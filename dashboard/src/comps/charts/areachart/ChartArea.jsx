import React from 'react';
import './chartarea.css';
import { AreaChart, Legend, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartArea(props) {
	const { data } = props;
	// const data = [
	// 	{
	// 		name: 'Mon',
	// 		tKapacitet: 4000,
	// 		vKapacitet: 2400,
	// 	},
	// 	{
	// 		name: 'Tue',
	// 		tKapacitet: 3000,
	// 		vKapacitet: 1398,
	// 	},
	// 	{
	// 		name: 'Wed',
	// 		tKapacitet: 5000,
	// 		vKapacitet: 600,
	// 	},
	// 	{
	// 		name: 'Thur',
	// 		tKapacitet: 2780,
	// 		vKapacitet: 1908,
	// 	},
	// 	{
	// 		name: 'Fri',
	// 		tKapacitet: 3890,
	// 		vKapacitet: 2800,
	// 	},
	// 	{
	// 		name: 'Sat',
	// 		tKapacitet: 2390,
	// 		vKapacitet: 2800,
	// 	},
	// 	{
	// 		name: 'Sun',
	// 		tKapacitet: 5490,
	// 		vKapacitet: 4300,
	// 	},
	// ];

	return (
		<div className="chart-area">
			<h2 className="chart-area-title">Kapacitetsutnyttjande</h2>
			<ResponsiveContainer width="80%" aspect={3 / 1}>
				<AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colortKapacitet" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorvKapacitet" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="tKapacitet"
						name="Tillgänglig kapacitet"
						stroke="#82ca9d"
						fillOpacity={1}
						fill="url(#colorvKapacitet)"
					/>
					<Area
						type="monotone"
						dataKey="vKapacitet"
						name="Verklig kapacitet"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colortKapacitet)"
					/>
					<Legend verticalAlign="top" height={36} />
					<Line name="pv of pages" type="monotone" dataKey="pv" stroke="#8884d8" />
					<Line name="uv of pages" type="monotone" dataKey="uv" stroke="#82ca9d" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
