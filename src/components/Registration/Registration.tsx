import * as React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { OptionsType, ValueType } from 'react-select/lib/types';
import Button from '@material-ui/core/Button';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Select from 'react-select';

import Card from '../Card/Card';
import { SERVICE_API_URL, setJwt } from '../../utils';

const css = require('./Registration.module.css');

interface AutocompleteItem {
	id: string;
	address: string;
}

interface RegistrationRequestBody {
	FullName?: string;
	Password?: string;
	Email?: string;
	Phone?: string;
	BuildingId?: string;
}

interface RegistrationResponseBody {
	email: string;
	token: string;
}

const Registration: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const [options, setOptions] = useState<OptionsType<AutocompleteItem>>([]);

	const handleChange = (value: ValueType<AutocompleteItem>) => {
		console.log(value);
	};

	const handleInputChange = (value: string) => {
		if (value) {
			fetch(`${SERVICE_API_URL}/autocomplete/house?address=${value}`)
				.then(response => response.json())
				.then((data: AutocompleteItem[]) =>
					setOptions(
						data.map(
							item =>
								({
									label: item.address,
									value: item.id
								} as any)
						)
					)
				);
		}
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.stopPropagation();
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const requestBody: RegistrationRequestBody = {
			FullName: formData.get('FullName') as string,
			Password: formData.get('Password') as string,
			Email: formData.get('Email') as string,
			Phone: formData.get('Phone') as string,
			BuildingId: formData.get('BuildingId') as string
		};

		const response = await fetch(`${SERVICE_API_URL}/auth/register/b2c`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: new Headers({
				'content-type': 'application/json'
			})
		});

		const data: RegistrationResponseBody = await response.json();

		if (data.token) {
			setJwt(data.token);
			history.push('/');
			document.location.reload();
		}
	};

	return (
		<div className={css.wrapper}>
			<Card className={css.card}>
				<h1 className={css.title}>Регистрация</h1>

				<form onSubmit={handleFormSubmit}>
					<ul>
						<li>
							<TextField
								variant="outlined"
								label="Эл. почта"
								name="Email"
								classes={{
									root: css.field
								}}
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
							<TextField className={css.field} variant="outlined" label="Телефон" name="Phone" />
						</li>

						<li>
							<TextField className={css.field} variant="outlined" label="ФИО" name="FullName" />
						</li>

						<li>
							<Select
								options={options}
								onChange={handleChange}
								onInputChange={handleInputChange}
								name="BuildingId"
							/>
						</li>

						<li>
							<Button className={css.button} type="submit" variant="contained" color="primary">
								Зарегистрироваться
							</Button>
						</li>

						<li>
							<div className={css.auth}>
								<Link to="/auth">или войти</Link>
							</div>
						</li>
					</ul>
				</form>
			</Card>
		</div>
	);
};

export default withRouter(Registration);
