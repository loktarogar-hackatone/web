import React from 'react';

import Map from '../Map/Map';
import TopAppBar from '../TopAppBar/TopAppBar';
import User from '../User/User';
import Apartment from '../Apartment/Apartment';
import Company from '../Company/Company';
import Feed from '../Feed/Feed';
import Charts from '../Charts/Charts';
import { User as UserType, UserRole } from '../../types';

const { YMaps } = require('react-yandex-maps');
const css = require('./Dashboard.module.css');

interface Props {
	user: UserType;
}

const Dashboard: React.FunctionComponent<Props> = ({ user }) => {
	const isB2B = user.userType === UserRole.B2B;

	return (
		<YMaps>
			<TopAppBar />

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
						<Charts meter="0" title="Горячая вода" />
						<Charts meter="0" title="Холодная вода" />
					</div>

					<div className={css.col}>
						<Feed
							news={[
								{
									id: '1',
									date: new Date(),
									text:
										'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quam, tenetur! Animi architecto commodi dignissimos dolore facere in iste, itaque labore molestiae optio perspiciatis, quisquam, repellat rerum sapiente velit voluptatibus.'
								},
								{
									id: '2',
									date: new Date(),
									text:
										'Animi architecto commodi dignissimos dolore facere in iste, itaque labore molestiae optio perspiciatis, quisquam, repellat rerum sapiente velit voluptatibus.'
								}
							]}
						/>
					</div>
				</div>
			)}

			{!isB2B && (
				<div className={css.page}>
					<div className={css.col}>
						<Map address="Саратов, Первомайская, 47/53" />

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
						<Charts meter="0" title="Горячая вода" />
						<Charts meter="0" title="Холодная вода" />

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
						<Feed
							news={[
								{
									id: '1',
									date: new Date(),
									text:
										'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quam, tenetur! Animi architecto commodi dignissimos dolore facere in iste, itaque labore molestiae optio perspiciatis, quisquam, repellat rerum sapiente velit voluptatibus.'
								},
								{
									id: '2',
									date: new Date(),
									text:
										'Animi architecto commodi dignissimos dolore facere in iste, itaque labore molestiae optio perspiciatis, quisquam, repellat rerum sapiente velit voluptatibus.'
								}
							]}
						/>
					</div>
				</div>
			)}
		</YMaps>
	);
};

export default Dashboard;
