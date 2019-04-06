import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';

import Card from '../Card/Card';
import { Apartment as ApartmentType } from '../../types';

interface Props {
	apartment: ApartmentType;
}

const Apartment: React.FunctionComponent<Props> = ({ apartment }) => {
	return (
		<Card
			title={
				<>
					<HomeIcon />
					<span>Квартира</span>
				</>
			}
			buttonText="Подробнее"
		>
			<ul>
				<li>
					{apartment.entrance} подъезд, {apartment.floor} этаж
				</li>
				<li>Номер квартиры: {apartment.number}</li>
				<li>Площадь квартиры: {apartment.size} кв. м.</li>
				<li>Владелец: {apartment.owner}</li>
			</ul>
		</Card>
	);
};

export default Apartment;
