import * as React from 'react';
import Card from '../Card/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const css = require('./Auth.module.css');

const Auth: React.FunctionComponent = () => {
	return (
		<div className={css.wrapper}>
			<Card className={css.card}>
				<h1 className={css.title}>Вход</h1>

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
						<Button className={css.button} variant="contained" color="primary">
							Войти
						</Button>
					</li>
				</ul>
			</Card>
		</div>
	);
};

export default Auth;
