const { application } = require('express');
const express = require('express');

const app = express();

let loads = [
	{ loadNum: 11, group: 'Monteringsavdelningen' },
	{ loadNum: 2, group: 'Förpackningsavdelningen' },
	{ loadNum: 3, group: 'Målningsavdelningen' },
	{ loadNum: 4, group: 'Maskinavdelningen' },
];

let absance = [
	{ maskingrupp: 'Kalle Jansson', datum: '2020-01-10', kommentar: 'Från servern' },
	{ maskingrupp: 'CNC-maskin', datum: '2020-01-13', kommentar: 'Under reparation' },
	{ maskingrupp: 'Borrmaskin', datum: '2020-01-14', kommentar: 'Under reparation' },
	{ maskingrupp: 'Johanna Jonsson', datum: '2020-01-15', kommentar: 'Ledig' },
];

let prodorders = [
	{
		id: 1011001,
		startdatum: '2022-01-28T08:00:00',
		slutdatum: '2022-01-28T15:00:00',
		kapacitetsbehov: 420,
	},
	{
		id: 1011002,
		startdatum: '2022-01-28T08:00:00',
		slutdatum: '2022-01-28T16:00:00',
		kapacitetsbehov: 480,
	},
	{
		id: 1011003,
		startdatum: '2022-01-28T08:00:00',
		slutdatum: '2022-01-28T17:00:00',
		kapacitetsbehov: 540,
	},
	{
		id: 1011004,
		startdatum: '2022-01-28T08:00:00',
		slutdatum: '2022-01-28T18:00:00',
		kapacitetsbehov: 60,
	},
];

let capUtil = [
	{
		name: '2022-01-10T00:00:00',
		tKapacitet: 4000,
		vKapacitet: 2400,
	},
	{
		name: '2022-01-11T00:00:00',
		tKapacitet: 3000,
		vKapacitet: 1398,
	},
	{
		name: '2022-01-12T00:00:00',
		tKapacitet: 5000,
		vKapacitet: 600,
	},
	{
		name: '2022-01-13T00:00:00',
		tKapacitet: 2780,
		vKapacitet: 1908,
	},
	{
		name: '2022-01-14T00:00:00',
		tKapacitet: 3890,
		vKapacitet: 2800,
	},
	{
		name: '2022-01-17T00:00:00',
		tKapacitet: 2390,
		vKapacitet: 2800,
	},
	{
		name: '2022-01-18T00:00:00',
		tKapacitet: 5490,
		vKapacitet: 4300,
	},
	{
		name: '2022-01-19T00:00:00',
		tKapacitet: 5490,
		vKapacitet: 4300,
	},
	{
		name: '2022-01-20T00:00:00',
		tKapacitet: 5490,
		vKapacitet: 4300,
	},
	{
		name: '2022-01-21T00:00:00',
		tKapacitet: 5490,
		vKapacitet: 4300,
	},
];

let capNeed = [
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

let cap = [
	{
		avdelning: 'Monteringsavdelningen',
		fKapacitet: 10,
		ear: 20,
		mdr: 30,
	},
	{
		avdelning: 'Förpackningsavdelningen',
		fKapacitet: 10,
		ear: 20,
		mdr: 30,
	},
	{
		avdelning: 'Målningsavdelningen',
		fKapacitet: 10,
		ear: 20,
		mdr: 30,
	},
	{
		avdelning: 'Maskinavdelningen',
		fKapacitet: 10,
		ear: 20,
		mdr: 30,
	},
];

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.json());

app.post('/api/hello', (req, res) => {
	res.status(200).send('Hello World');
});

app.post('/api/load', (req, res) => {
	data = req.body;
	let returnData = data.map((load) => {
		if (load.WorkCenterNo === '100') {
			maskingrupp = 'Monteringsavdelningen';
		} else if (load.WorkCenterNo === '200') {
			maskingrupp = 'Förpackningsavdelningen';
		} else if (load.WorkCenterNo === '300') {
			maskingrupp = 'Målningsavdelningen';
		} else if (load.WorkCenterNo === '400') {
			maskingrupp = 'Maskinavdelningen';
		}
		return {
			group: maskingrupp,
			loadNum: ((load.UsedCap / load.AvailableCap) * 100).toFixed(0),
		};
	});
	loads = returnData;
	res.status(200).send('OK');
});

app.post('/api/prodorder', (req, res) => {
	data = req.body;
	let returnData = data.map((order) => {
		return {
			id: order.ProdOrderNo,
			startdatum: order.StartingDateTime,
			slutdatum: order.EndingDateTime,
			kapacitetsbehov: (order.TotalCapNeed / 60000).toFixed(0),
		};
	});
	prodorders = returnData;
	res.status(200).send('OK');
});

app.post('/api/absance', (req, res) => {
	data = req.body;
	let returnData = data.map((abs) => {
		return {
			maskingrupp: abs.Name,
			datum: abs.Date,
			kommentar: abs.Description,
		};
	});
	absance = returnData;
	res.status(200).send('OK');
});

app.post('/api/caputil', (req, res) => {
	data = req.body;
	let returnData = data.map((cap) => {
		return {
			name: cap.Date.slice(0, 10),
			tKapacitet: cap.TotalCap,
			vKapacitet: cap.UsedCap,
		};
	});
	capUtil = returnData;
	res.status(200).send('OK');
});

app.post('/api/capneed', (req, res) => {
	data = req.body;
	let returnData = data.map((cap) => {
		return {
			name: cap.Name,
			usedCap: cap.UsedCap,
			availableCap: cap.AvailableCap,
		};
	});
	capNeed = returnData;
	res.status(200).send('OK');
});

app.post('/api/cap', (req, res) => {
	data = req.body;
	let returnData = data.map((cap) => {
		if (cap.Name === 'Monteringsavdelningen') {
			(avdelning = cap.Name), (ear = ((cap.AvailableCap / cap.MDREAR - 1) * -100).toFixed(0));
			mdr = 0;
			fKapacitet = +ear + +mdr;
		} else {
			avdelning = cap.Name;
			mdr = ((cap.AvailableCap / cap.MDREAR - 1) * -100).toFixed(0);
			ear = 0;
			fKapacitet = +ear + +mdr;
		}
		return {
			avdelning,
			ear,
			mdr,
			fKapacitet,
		};
	});
	cap = returnData;
	res.status(200).send('OK');
});

app.get('/api/load', (req, res) => {
	res.json(loads);
});

app.get('/api/prodorder', (req, res) => {
	res.json(prodorders);
});

app.get('/api/absence', (req, res) => {
	res.json(absance);
});

app.get('/api/caputil', (req, res) => {
	res.json(capUtil);
});

app.get('/api/capneed', (req, res) => {
	res.json(capNeed);
});

app.get('/api/cap', (req, res) => {
	res.json(cap);
});

app.listen(5050, () => {
	console.log('Server is running on port 5050');
});
