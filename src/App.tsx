import React from 'react';

import Map from './components/Map/Map';
import TopAppBar from './components/TopAppBar/TopAppBar';
import User from './components/User/User';
import Apartment from './components/Apartment/Apartment';
import Company from './components/Company/Company';
import Feed from './components/Feed/Feed';

const { YMaps } = require('react-yandex-maps');
const css = require('./App.module.css');

function PrimarySearchAppBar() {
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
					<User
						user={{
							id: '1',
							clientId: '857350124124',
							name: 'Наумов Павел Анатольевич',
							phone: '+7 (927) 132-41-21',
							email: 'some-email@gmail.com'
						}}
					/>
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
}

export default PrimarySearchAppBar;
