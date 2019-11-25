// imports
import 'babel-polyfill';
import { AddDataVisualisation } from './datavis/index';

const settings = {
	init: {
		targetDiv: '#map_container',
		endpoint:
			'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql',
		keyWord: '',
		mapJson:
			'https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json',
		svgSize: ['100%', '100%'],
	},
	render: {
		scaleExtent: [0.5, 20],
		dataExtent: [0, 1],
	},
	projection: {
		center: [120, -5],
		scale: 1400,
		translation: [window.innerWidth / 2, window.innerHeight / 2.6],
	},
	legend: {
		enabled: true,
		targetDiv: '#legend',
		height: '6.5em',
		width: '150px',
	},
};

AddDataVisualisation(settings);
