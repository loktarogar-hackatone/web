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
			buttonText="Подробнее"
		>
			<ul>
				<li>Лицевой счет: {user.clientId}</li>
				<li>Жилец: {user.name}</li>
				<li>Телефон: {user.phone}</li>
				<li>
					Эл. почта: <a href={`mailto:${user.email}`}>{user.email}</a>
				</li>
			</ul>
		</Card>
	);
};

export default User;
