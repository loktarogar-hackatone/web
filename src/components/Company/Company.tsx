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
				<li>
					<label>Название</label> {company.name}
				</li>

				<li>
					<label>Юридический адрес</label> {company.address}
				</li>

				<li>
					<label>ИНН</label> {company.taxId}
				</li>

				<li>
					<label>Телефон</label> {company.phone}
				</li>

				<li>
					<label>Эл. почта</label> <a href={`mailto:${company.email}`}>{company.email}</a>
				</li>
			</ul>
		</Card>
	);
};

export default Company;
