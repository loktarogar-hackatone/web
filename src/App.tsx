import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import { getJwt, SERVICE_API_URL } from './utils';
import Auth from './components/Auth/Auth';
import Helmet from 'react-helmet';

require('./App.module.css');

const App: React.FunctionComponent = () => {
	const [isAuthed, setIsAuthed] = useState(false);

	const getUserInfo = async (jwt: string) => {
		try {
			const response = await fetch(`${SERVICE_API_URL}/auth/me`, {
				method: 'GET',
				headers: new Headers({
					'content-type': 'text/plain',
					Authorization: `Bearer ${jwt}`
				})
			});

			const data = await response.json();
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const jwt = getJwt();

		if (jwt) {
			getUserInfo(jwt);
		}
	});

	return (
		<BrowserRouter>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&amp;subset=cyrillic"
					rel="stylesheet"
				/>
			</Helmet>

			<Switch>
				<Route path="/auth">
					<Auth />
				</Route>

				{!isAuthed && <Redirect to="/auth" />}

				<Route path="/" exact>
					<Dashboard />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
