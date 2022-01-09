import Header from './comps/header/Header';
import './app.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChartArea from './comps/charts/areachart/ChartArea';
import ChartBar from './comps/charts/barchart/ChartBar';
import KapProd from './comps/tables/kapprod/KapProd';
import Prodorder from './comps/tables/prodorder/Prodorder';
import Franvaro from './comps/tables/franvaro/Franvaro';
import Cards from './comps/cards/Cards';

const initialLoads = [
	// { loadNum: 53, group: 'Monteringsavdelningen' },
	// { loadNum: 73, group: 'Förpackningsavdelningen' },
	// { loadNum: 45, group: 'Målningsavdelningen' },
	// { loadNum: 90, group: 'Maskinavdelningen' },
];

const initialAbsance = [
	{ maskingrupp: 'Kalle Jansson', datum: '2020-01-10', kommentar: 'Sjuk' },
	{ maskingrupp: 'CNC-maskin', datum: '2020-01-13', kommentar: 'Under reparation' },
	{ maskingrupp: 'Borrmaskin', datum: '2020-01-14', kommentar: 'Under reparation' },
	{ maskingrupp: 'Johanna Jonsson', datum: '2020-01-15', kommentar: 'Ledig' },
];

const initialCapUtil = [
	{
		name: 'Mon',
		tKapacitet: 4000,
		vKapacitet: 2400,
	},
	{
		name: 'Tue',
		tKapacitet: 3000,
		vKapacitet: 1398,
	},
	{
		name: 'Wed',
		tKapacitet: 5000,
		vKapacitet: 600,
	},
	{
		name: 'Thur',
		tKapacitet: 2780,
		vKapacitet: 1908,
	},
	{
		name: 'Fri',
		tKapacitet: 3890,
		vKapacitet: 2800,
	},
	{
		name: 'Sat',
		tKapacitet: 2390,
		vKapacitet: 2800,
	},
	{
		name: 'Sun',
		tKapacitet: 5490,
		vKapacitet: 4300,
	},
];

const initialProdorders = [
	// {
	// 	id: 1011001,
	// 	startdatum: '2022-01-28T08:00:00',
	// 	slutdatum: '2022-01-28T15:00:00',
	// 	kapacitetsbehov: 420,
	// },
	// {
	// 	id: 1011002,
	// 	startdatum: '2022-01-28T08:00:00',
	// 	slutdatum: '2022-01-28T16:00:00',
	// 	kapacitetsbehov: 480,
	// },
	// {
	// 	id: 1011003,
	// 	startdatum: '2022-01-28T08:00:00',
	// 	slutdatum: '2022-01-28T17:00:00',
	// 	kapacitetsbehov: 540,
	// },
	// {
	// 	id: 1011001,
	// 	startdatum: '2022-01-28T08:00:00',
	// 	slutdatum: '2022-01-28T18:00:00',
	// 	kapacitetsbehov: 600,
	// },
];

const initialCapNeed = [
	{
		name: 'Micke',
		usedCap: 500,
		availableCap: 200,
	},
	{
		name: 'Bengt',
		usedCap: 240,
		availableCap: 200,
	},
	{
		name: 'Linda',
		usedCap: 200,
		availableCap: 200,
	},
];

const initialCap = [
	{
		avdelning: 'Monteringsavdelningen',
		fKapacitet: 1,
		ear: 1,
		mdr: 1,
	},
	{
		avdelning: 'Förpackningsavdelningen',
		fKapacitet: 1,
		ear: 1,
		mdr: 1,
	},
	{
		avdelning: 'Målningsavdelningen',
		fKapacitet: 1,
		ear: 1,
		mdr: 1,
	},
	{
		avdelning: 'Maskinavdelningen',
		fKapacitet: 1,
		ear: 1,
		mdr: 1,
	},
];

function App() {
	const [loads, setLoads] = useState(initialLoads);
	const [absance, setAbsance] = useState(initialAbsance);
	const [prodOrders, setProdOrders] = useState(initialProdorders);
	const [capUtil, setCapUtil] = useState(initialCapUtil);
	const [capNeed, setCapNeed] = useState(initialCapNeed);
	const [cap, setCap] = useState(initialCap);

	useEffect(() => {
		async function fetchData() {
			const load = await axios.get('http://localhost:5050/api/load');
			const abs = await axios.get('http://localhost:5050/api/absence');
			const prod = await axios.get('http://localhost:5050/api/prodorder');
			const capUtil = await axios.get('http://localhost:5050/api/caputil');
			const capNeed = await axios.get('http://localhost:5050/api/capneed');
			const cap = await axios.get('http://localhost:5050/api/cap');

			setLoads(load.data);
			setAbsance(abs.data);
			setProdOrders(prod.data);
			setCapUtil(capUtil.data);
			setCapNeed(capNeed.data);
			setCap(cap.data);
		}
		fetchData();
	}, []);

	return (
		<div className="app">
			<div className="app-cards">
				<Cards loads={loads} />
			</div>
			<div className="container">
				<div className="charts-col">
					<ChartArea data={capUtil} />
					<ChartBar data={capNeed} />
				</div>
				<div className="tables-col">
					<KapProd rows={cap} />
					<Prodorder rows={prodOrders} />
					<Franvaro rows={absance} />
				</div>
			</div>
		</div>
	);
}

export default App;
