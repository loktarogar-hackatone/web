import React from 'react';

import Map from './components/Map/Map';
import TopAppBar from './components/TopAppBar/TopAppBar';
import Card from './components/Card/Card';

const { YMaps } = require('react-yandex-maps');
const css = require('./App.module.css');

function PrimarySearchAppBar() {
	return (
		<YMaps>
			<TopAppBar />

			<div className={css.page}>
				<Map address="Саратов, Первомайская, 47/53" />
				<Card title="Жилец" />
			</div>
		</YMaps>
	);
}

export default PrimarySearchAppBar;
