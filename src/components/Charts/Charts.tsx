import * as React from 'react';
import { useEffect, useState } from 'react';
import { Bar, ChartData } from 'react-chartjs-2';
import ChartIcon from '@material-ui/icons/InsertChart';

import Card from '../Card/Card';
import { SERVICE_API_URL } from '../../utils';
import { MeterType } from '../../types';

interface Props {
	meter: string;
}

const chartLabels = {
	[MeterType.ColdWater]: 'Холодная вода',
	[MeterType.HotWater]: 'Горячая вода',
	[MeterType.Electric]: 'Электричество',
	[MeterType.Gas]: 'Газ'
};

const meterData = {
	[MeterType.ColdWater]: {
		label: 'м³',
		backgroundColor: 'rgba(132,99,255,0.2)',
		borderColor: 'rgba(132,99,255,1)',
		hoverBackgroundColor: 'rgba(132,99,255,0.4)',
		hoverBorderColor: 'rgba(132,99,255,1)'
	},
	[MeterType.HotWater]: {
		label: 'м³',
		backgroundColor: 'rgba(255,99,132,0.2)',
		borderColor: 'rgba(255,99,132,1)',
		hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		hoverBorderColor: 'rgba(255,99,132,1)'
	},
	[MeterType.Electric]: {
		label: 'кВт⋅ч',
		backgroundColor: 'rgba(241,220,47,0.2)',
		borderColor: 'rgba(241,220,47)',
		hoverBackgroundColor: 'rgba(241,220,47,0.4)',
		hoverBorderColor: 'rgba(241,220,47,1)'
	},
	[MeterType.Gas]: {
		label: 'м³',
		backgroundColor: 'rgba(255,99,132,0.2)',
		borderColor: 'rgba(255,99,132,1)',
		hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		hoverBorderColor: 'rgba(255,99,132,1)'
	}
};

const Charts: React.FunctionComponent<Props> = ({ meter }) => {
	const [data, setData] = useState<ChartData<any>>(null);
	const [meterType, setMeterType] = useState<MeterType>(null);

	const getChartsData = async () => {
		const response = await fetch(
			`${SERVICE_API_URL}/data/meter?uniqueIdentifier=${meter}&startDate=01.05.2019&endDate=01.06.2019`
		);

		const data: ({
			insertionDateTime: string;
			value: number;
			measurementType: number;
		})[] = await response.json();

		const labels: string[] = [];
		const values: number[] = [];
		let localMeterType: MeterType;
		let lastVal = 0;

		data.forEach(item => {
			if (!localMeterType) {
				localMeterType = item.measurementType;
				setMeterType(item.measurementType);
			}

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
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: values,
					...meterData[localMeterType]
				}
			]
		});
	};

	useEffect(() => {
		getChartsData();
	}, []);

	return (
		<Card
			title={
				<>
					<ChartIcon />
					<span>{chartLabels[meterType]}</span>
				</>
			}
		>
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
