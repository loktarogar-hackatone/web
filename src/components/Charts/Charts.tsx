import * as React from 'react';
import { Bar, ChartData } from 'react-chartjs-2';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import { SERVICE_API_URL } from '../../utils';

interface Props {
	meter: string;
}

const Charts: React.FunctionComponent<Props> = ({ meter }) => {
	const [data, setData] = useState<ChartData<any>>(null);

	const getChartsData = async () => {
		const response = await fetch(
			`${SERVICE_API_URL}/data/meter?uniqueIdentifier=${meter}&startDate=01.05.2019&endDate=01.06.2019`
		);

		const data: ({
			insertionDateTime: string;
			value: number;
		})[] = await response.json();

		const labels: string[] = [];
		const values: number[] = [];
		let lastVal = 0;

		data.forEach(item => {
			labels.push(item.insertionDateTime.substr(0, 2));

			if (lastVal) {
				values.push(item.value - lastVal);
			} else {
				values.push(0);
			}

			lastVal = item.value;
		});

		setData({
			labels: labels,
			datasets: [
				{
					label: 'горячая вода, м³',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: values
				}
			]
		});
	};

	useEffect(() => {
		getChartsData();
	}, []);

	return (
		<Card>
			{data && (
				<Bar
					data={data}
					width={100}
					options={{
						maintainAspectRatio: false
					}}
				/>
			)}
		</Card>
	);
};

export default Charts;
