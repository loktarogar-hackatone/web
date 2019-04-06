import * as React from 'react';
import UserIcon from '@material-ui/icons/Person';
import Card from '../Card/Card';
import { User as UserType } from '../../types';

interface Props {
	user: UserType;
}

const User: React.FunctionComponent<Props> = ({ user }) => {
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
			<ul>
				<li>
					<label>Лицевой счет</label> {user.clientId}
				</li>

				<li>
					<label>Жилец</label> {user.name}
				</li>

				{/*<li>*/}
				{/*<label>Телефон</label> {user.phone}*/}
				{/*</li>*/}

				{/*<li>*/}
				{/*<label>Эл. почта</label> <a href={`mailto:${user.email}`}>{user.email}</a>*/}
				{/*</li>*/}
			</ul>
		</Card>
	);
};

export default User;
