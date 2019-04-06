import * as React from 'react';
import BagIcon from '@material-ui/icons/Business';
import Card from '../Card/Card';
import { Company as CompanyType } from '../../types';

interface Props {
	company: CompanyType;
}

const Company: React.FunctionComponent<Props> = ({ company }) => {
	return (
		<Card
			title={
				<>
					<BagIcon />
					<span>Управляющая компания</span>
				</>
			}
			buttonText="Подробнее"
			onClick={() => {}}
		>
			<ul>
				<li>Название: {company.name}</li>
				<li>Юридический адрес: {company.address}</li>
				<li>ИНН: {company.taxId}</li>
				<li>Телефон: {company.phone}</li>
				<li>
					Эл. почта: <a href={`mailto:${company.email}`}>{company.email}</a>
				</li>
			</ul>
		</Card>
	);
};

export default Company;
