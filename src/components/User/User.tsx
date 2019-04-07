import * as React from 'react';
import { useEffect } from 'react';
import UserIcon from '@material-ui/icons/Person';
import Loader from '@material-ui/core/CircularProgress';

import Card from '../Card/Card';
import { User as UserType } from '../../types';
import { getJwt, SERVICE_API_URL } from '../../utils';
import { useState } from 'react';

const User: React.FunctionComponent = () => {
	const [user, setUser] = useState<UserType>(null);
	const [isLoading, setIsLoading] = useState(false);

	const getUserInfo = async (jwt: string) => {
		setIsLoading(true);

		try {
			const response = await fetch(`${SERVICE_API_URL}/auth/me`, {
				method: 'GET',
				headers: new Headers({
					'content-type': 'text/plain',
					Authorization: `Bearer ${jwt}`
				})
			});

			const data: UserType = await response.json();
			setIsLoading(false);

			if (data) {
				setUser(data);
			}
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const jwt = getJwt();

		if (jwt) {
			getUserInfo(jwt);
		}
	}, []);

	return (
		<Card
			title={
				<>
					<UserIcon />
					<span>Жилец</span>
				</>
			}
			buttonText="Перейти в профиль"
			onClick={() => {}}
		>
			{isLoading && <Loader />}

			{user && (
				<ul>
					<li>
						<label>Лицевой счет</label> 8471234729
					</li>

					<li>
						<label>Жилец</label> {user.fullName}
					</li>

					{/*<li>*/}
					{/*<label>Телефон</label> {user.phone}*/}
					{/*</li>*/}

					{/*<li>*/}
					{/*<label>Эл. почта</label> <a href={`mailto:${user.email}`}>{user.email}</a>*/}
					{/*</li>*/}
				</ul>
			)}
		</Card>
	);
};

export default User;
