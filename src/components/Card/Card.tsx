import * as React from 'react';
import MUICard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const css = require('./Card.module.css');

interface Props {
	title: string;
	text?: string;
	clickable?: boolean;
}

const Card: React.FunctionComponent<Props> = ({ children, title, text, clickable = false }) => {
	const inner = () => (
		<div>
			{children}

			<CardContent>
				<div className={css.title}>{title}</div>

				<Typography component="p">{text}</Typography>
			</CardContent>
		</div>
	);

	return (
		<MUICard
			classes={{
				root: css.card
			}}
		>
			{clickable ? <CardActionArea>{inner()}</CardActionArea> : inner()}

			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>

				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions>
		</MUICard>
	);
};

export default Card;
