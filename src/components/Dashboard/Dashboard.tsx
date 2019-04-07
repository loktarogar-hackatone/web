import React from 'react';

import Map from '../Map/Map';
import TopAppBar from '../TopAppBar/TopAppBar';
import User from '../User/User';
import Apartment from '../Apartment/Apartment';
import Company from '../Company/Company';
import Feed from '../Feed/Feed';
import Charts from '../Charts/Charts';
import { MeterType, User as UserType, UserRole } from '../../types';
import Card from '../Card/Card';
import B2BCharts from '../B2BCharts/B2BCharts';

const { YMaps } = require('react-yandex-maps');
const css = require('./Dashboard.module.css');

interface Props {
	user: UserType;
}

const Dashboard: React.FunctionComponent<Props> = ({ user }) => {
	const isB2B = user.userType === UserRole.B2B;

	return (
		<YMaps>
			<TopAppBar
				isB2B={isB2B}
				houseId={user.buildingIds && user.buildingIds.length ? user.buildingIds[0] : '0'}
			/>

			{isB2B && (
				<div className={css.page}>
					<div className={css.col}>
						<User user={user} />

						<Company
							company={{
								id: '1',
								taxId: '2419240123',
								name: 'OOO Большие Бугры',
								phone: '+7 (845) 231-23-11',
								email: 'big_bugri@gmail.com',
								address: 'г. Саратов, ул. Московская, д. 731, оф. 26'
							}}
						/>
					</div>

					<div className={css.col}>
						{user.buildingIds.map(buildingId => (
							<B2BCharts key={buildingId} buildingId={buildingId} meterType={MeterType.Electric} />
						))}
					</div>

					<div className={css.col}>
						<Feed news={user.feed.reverse()} />
					</div>
				</div>
			)}

			{!isB2B && (
				<div className={css.page}>
					<div className={css.col}>
						<Map address={user.buildData[user.buildingIds[0]].address} />

						<Apartment
							apartment={{
								id: '1',
								number: 150,
								size: 45,
								entrance: 3,
								floor: 7,
								owner: 'Васильев Сергей Петрович'
							}}
						/>
					</div>

					<div className={css.col}>
						{user.meters && user.meters.map(meterId => <Charts key={meterId} meter={meterId} />)}

						<User user={user} />

						<Company
							company={{
								id: '1',
								taxId: '2419240123',
								name: 'OOO Большие Бугры',
								phone: '+7 (845) 231-23-11',
								email: 'big_bugri@gmail.com',
								address: 'г. Саратов, ул. Московская, д. 731, оф. 26'
							}}
						/>
					</div>

					<div className={css.col}>
						<Feed news={user.feed.reverse()} />
					</div>
				</div>
			)}
		</YMaps>
	);
};

export default Dashboard;
