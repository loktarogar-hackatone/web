import React from 'react';
import { Bar } from 'react-chartjs-2';

import Map from '../Map/Map';
import TopAppBar from '../TopAppBar/TopAppBar';
import User from '../User/User';
import Apartment from '../Apartment/Apartment';
import Company from '../Company/Company';
import Feed from '../Feed/Feed';
import Card from '../Card/Card';

const { YMaps } = require('react-yandex-maps');
const css = require('./Dashboard.module.css');

const Dashboard: React.FunctionComponent = () => {
	return (
		<YMaps>
			<TopAppBar />

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
					<Card>
						<Bar
							data={{
								labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
								datasets: [
									{
										label: 'My First dataset',
										backgroundColor: 'rgba(255,99,132,0.2)',
										borderColor: 'rgba(255,99,132,1)',
										borderWidth: 1,
										hoverBackgroundColor: 'rgba(255,99,132,0.4)',
										hoverBorderColor: 'rgba(255,99,132,1)',
										data: [65, 59, 80, 81, 56, 55, 40]
									}
								]
							}}
							width={100}
							options={{
								maintainAspectRatio: false
							}}
						/>
					</Card>

					<User />

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
		</YMaps>
	);
};

export default Dashboard;
