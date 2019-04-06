import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';

require('./App.module.css');

function PrimarySearchAppBar() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Dashboard />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default PrimarySearchAppBar;
