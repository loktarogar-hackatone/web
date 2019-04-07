import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { install, ThemeProvider } from '@material-ui/styles';
import Helmet from 'react-helmet';
import { HashRouter } from 'react-router-dom';

install();

ReactDOM.render(
	<ThemeProvider
		theme={
			{
				shape: {
					borderRadius: 2
				},
				spacing: {
					unit: 10
				}
			} as any
		}
	>
		<Helmet>
			<link
				href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&amp;subset=cyrillic"
				rel="stylesheet"
			/>
		</Helmet>

		<HashRouter>
			<App />
		</HashRouter>
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
