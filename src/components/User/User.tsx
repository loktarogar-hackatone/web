import * as React from 'react';
import UserIcon from '@material-ui/icons/Person';

import Card from '../Card/Card';
import { User as UserType, UserRole } from '../../types';

interface Props {
	user: UserType;
}

const User: React.FunctionComponent<Props> = ({ user }) => {
	return (
		<Card
			title={
				<>
					<UserIcon />
					<span>{user.userType === UserRole.B2B ? 'Администратор' : 'Жилец'}</span>
				</>
			}
			buttonText="Перейти в профиль"
			onClick={() => {}}
		>
			{user && (
				<ul>
					<li>
						<label>Лицевой счет</label> 8471234729
					</li>

					<li>
						<label>{user.userType === UserRole.B2B ? 'Администратор' : 'Жилец'}</label> {user.fullName}
					</li>

					{/*<li>*/}
					{/*<label>Телефон</label> {user.phone}*/}
					{/*</li>*/}

					{/*<li>*/}
					{/*<label>Эл. почта</label> <a href={`mailto:${user.email}`}>{user.email}</a>*/}
					{/*</li>*/}
				</ul>
			)}
		</Card>
	);
};

export default User;
