import * as React from 'react';
import MUICard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const css = require('./Card.module.css');

interface Props {
	title?: string;
	header?: React.ReactNode | string;
	width?: string;
	buttonText?: string;
	onClick?: () => void;
	onButtonClick?: () => void;
}

const Card: React.FunctionComponent<Props> = ({
	buttonText,
	onButtonClick,
	onClick,
	width = '300px',
	children,
	title,
	header
}) => {
	const inner = () => (
		<div>
			{header}

			<CardContent>
				{title && (
					<Typography className={css.title} variant="h6">
						{title}
					</Typography>
				)}

				{children}
			</CardContent>
		</div>
	);

	return (
		<MUICard
			style={{
				width: width
			}}
			classes={{
				root: css.card
			}}
		>
			{!!onClick ? <CardActionArea>{inner()}</CardActionArea> : inner()}

			<CardActions classes={{ root: css.actions }}>
				<Button size="small" color="primary" onClick={onButtonClick}>
					{buttonText}
				</Button>
			</CardActions>
		</MUICard>
	);
};

export default Card;
