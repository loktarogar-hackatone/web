import * as React from 'react';
import NewsIcon from '@material-ui/icons/EventNote';
import format from 'date-fns/format';

import Card from '../Card/Card';
import { NewsEvent } from '../../types';

const css = require('./Feed.module.css');

interface Props {
	news: NewsEvent[];
}

const Feed: React.FunctionComponent<Props> = ({ news }) => {
	return (
		<Card
			title={
				<>
					<NewsIcon />
					<span>Последние новости</span>
				</>
			}
			buttonText="Все новости"
			onClick={() => {}}
		>
			<div className={css.feed}>
				{news.map(event => (
					<div key={event.id} className={css.event}>
						<div className={css.date}>{format(event.date, 'D MMMM')}</div>
						<div className={css.text}>{event.text}</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export default Feed;
