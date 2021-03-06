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
		>
			<ul>
				<li>
					<label>Номер квартиры</label> {apartment.number}
				</li>

				<li>
					<label>Площадь квартиры</label> {apartment.size} кв. м.
				</li>

				<li>
					<label>Владелец</label> {apartment.owner}
				</li>
			</ul>
		</Card>
	);
};

export default Apartment;
