import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Card from '../Card/Card';
import { SERVICE_API_URL, setJwt } from '../../utils';

const css = require('./Auth.module.css');

interface AuthRequestBody {
	Password?: string;
	Email?: string;
}

interface AuthResponseBody {
	email: string;
	token: string;
}

const Auth: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.stopPropagation();
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const requestBody: AuthRequestBody = {
			Password: formData.get('Password') as string,
			Email: formData.get('Email') as string
		};

		const response = await fetch(`${SERVICE_API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: new Headers({
				'content-type': 'application/json'
			})
		});

		const data: AuthResponseBody = await response.json();

		if (data.token) {
			setJwt(data.token);
			history.push('/');
			document.location.reload();
		}
	};
	return (
		<div className={css.wrapper}>
			<Card className={css.card}>
				<h1 className={css.title}>Вход</h1>

				<form onSubmit={handleFormSubmit}>
					<ul>
						<li>
							<TextField
								variant="outlined"
								label="Эл. почта"
								classes={{
									root: css.field
								}}
								name="Email"
							/>
						</li>

						<li>
							<TextField
								className={css.field}
								type="password"
								variant="outlined"
								label="Пароль"
								name="Password"
							/>
						</li>

						<li>
							<Button type="submit" className={css.button} variant="contained" color="primary">
								Войти
							</Button>
						</li>

						<li>
							<div className={css.registration}>
								<Link to="/registration">или зарегистрироваться</Link>
							</div>
						</li>
					</ul>
				</form>
			</Card>
		</div>
	);
};

export default withRouter(Auth);
