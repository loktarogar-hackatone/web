import * as React from 'react';
import Card from '../Card/Card';
import { memo, useEffect, useState } from 'react';
import { YANDEX_API_KEY } from '../../utils';

const css = require('./Map.module.css');
const { Map: MapComponent, Placemark } = require('react-yandex-maps');

interface Props {
	address: string;
}

const Map: React.FunctionComponent<Props> = memo(({ address }) => {
	const [coordinates, setCoordinates] = useState(null);

	const getCoordinates = async (address: string) => {
		const response = await fetch(
			`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${YANDEX_API_KEY}&geocode=${address}`
		);

		const info = await response.json();

		if (
			info &&
			info.response &&
			info.response.GeoObjectCollection &&
			info.response.GeoObjectCollection.featureMember &&
			info.response.GeoObjectCollection.featureMember.length &&
			info.response.GeoObjectCollection.featureMember[0]
		) {
			const position = info.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;

			return (position as string)
				.split(' ')
				.map(item => parseFloat(item))
				.reverse();
		}
	};

	useEffect(() => {
		getCoordinates(address).then(coordinates => setCoordinates(coordinates));
	}, [address]);

	return (
		<Card title={address}>
			<MapComponent
				className={css.map}
				defaultState={{
					center: coordinates,
					zoom: 17,
					behaviors: ['drag'],
					options: []
				}}
			>
				<Placemark geometry={coordinates} />
			</MapComponent>
		</Card>
	);
});

export default Map;
