import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import { getJwt, SERVICE_API_URL } from './utils';
import Auth from './components/Auth/Auth';
import Registration from './components/Registration/Registration';
import { User } from './types';

require('./App.module.css');

const App: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
	const [currentUser, setUser] = useState<User>(null);
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

			const data: User = await response.json();
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
		} else {
			if (location.pathname !== '/registration') {
				history.push('/auth');
			}
		}
	}, []);

	return (
		!isLoading && (
			<Switch>
				{currentUser && (
					<Route path="/">
						<Dashboard user={currentUser} />
					</Route>
				)}

				<Route path="/registration">
					<Registration />
				</Route>

				<Route path="/auth">
					<Auth />
				</Route>
			</Switch>
		)
	);
};

export default withRouter(App);
