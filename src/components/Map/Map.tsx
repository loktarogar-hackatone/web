import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import Loader from '@material-ui/core/CircularProgress';
import PlaceIcon from '@material-ui/icons/Place';

import Card from '../Card/Card';
import { YANDEX_API_KEY } from '../../utils';

const css = require('./Map.module.css');
const { Map: MapComponent, Placemark } = require('react-yandex-maps');

interface Props {
	address: string;
}

const Map: React.FunctionComponent<Props> = memo(({ address }) => {
	const [coordinates, setCoordinates] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

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

	const handleOnLoaded = () => setIsLoading(false);

	return (
		<Card
			header={
				<div className={css.wrapper}>
					{isLoading && <Loader className={css.loader} />}

					<MapComponent
						className={css.map}
						onLoad={handleOnLoaded}
						width="100%"
						defaultState={{
							center: coordinates,
							zoom: 17,
							behaviors: ['drag'],
							options: []
						}}
					>
						<Placemark geometry={coordinates} />
					</MapComponent>
				</div>
			}
			title={
				<>
					<PlaceIcon />
					<span>Адрес</span>
				</>
			}
			buttonText="Информация о доме"
			onClick={() => {}}
		>
			<ul>
				<li>
					<label>Полный адрес</label>
					{address}
				</li>
			</ul>
		</Card>
	);
});

export default Map;
