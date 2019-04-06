import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

import Card from '../Card/Card';
import { useState } from 'react';
import { OptionsType, ValueType } from 'react-select/lib/types';
import { SERVICE_API_URL } from '../../utils';

const css = require('./Registration.module.css');

interface AutocompleteItem {
	id: string;
	address: string;
}

const Registration: React.FunctionComponent = () => {
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

	return (
		<div className={css.wrapper}>
			<Card className={css.card}>
				<h1 className={css.title}>Регистрация</h1>

				<ul>
					<li>
						<TextField
							variant="outlined"
							label="Эл. почта"
							classes={{
								root: css.field
							}}
						/>
					</li>

					<li>
						<TextField className={css.field} type="password" variant="outlined" label="Пароль" />
					</li>

					<li>
						<TextField className={css.field} variant="outlined" label="Телефон" />
					</li>

					<li>
						<TextField className={css.field} variant="outlined" label="ФИО" />
					</li>

					<li>
						<Select options={options} onChange={handleChange} onInputChange={handleInputChange} />
					</li>

					<li>
						<Button className={css.button} variant="contained" color="primary">
							Зарегистрироваться
						</Button>
					</li>

					<li>
						<div className={css.auth}>
							<a href="/auth">или войти</a>
						</div>
					</li>
				</ul>
			</Card>
		</div>
	);
};

export default Registration;
