import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { RouteComponentProps, withRouter } from 'react-router';
import { getJwt, removeJwt, SERVICE_API_URL } from '../../utils';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	title: {
		display: 'none'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		width: 200
	},
	sectionDesktop: {
		display: 'flex'
	}
}));

interface OwnProps {
	isB2B: boolean;
	houseId: string;
}

type Props = OwnProps & RouteComponentProps;

const TopAppBar: React.FunctionComponent<Props> = ({ history, isB2B, houseId }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
	const [addMeterIsOpen, setMeterIsOpen] = React.useState(false);
	const [addEventIsOpen, setEventIsOpen] = React.useState(false);
	const [meterId, setMeterId] = React.useState('');
	const [eventText, setEventText] = React.useState('');

	const isMenuOpen = Boolean(anchorEl);

	function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleLogout() {
		removeJwt();
		handleMenuClose();
		history.push('/');
		document.location.reload();
	}

	function handleMeterOpen() {
		setMeterIsOpen(true);
	}

	function handleMeterClose() {
		setMeterIsOpen(false);
	}

	function handleEventOpen() {
		setEventIsOpen(true);
	}

	function handleEventClose() {
		setEventIsOpen(false);
	}

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
			<MenuItem onClick={handleLogout}>Выход</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6" color="inherit" noWrap>
						Мой дом
					</Typography>

					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						{/*<IconButton color="inherit">*/}
						{/*<Badge badgeContent={17} color="secondary">*/}
						{/*<NotificationsIcon />*/}
						{/*</Badge>*/}
						{/*</IconButton>*/}

						{!isB2B && (
							<Button style={{ color: '#ffffff', marginRight: 20 }} onClick={handleMeterOpen}>
								<AddIcon />
								<span style={{ marginLeft: 10 }}>Добавить счетчик</span>
							</Button>
						)}

						{isB2B && (
							<Button style={{ color: '#ffffff', marginRight: 20 }} onClick={handleEventOpen}>
								<AddIcon />
								<span style={{ marginLeft: 10 }}>Добавить новость</span>
							</Button>
						)}

						<IconButton
							aria-owns={isMenuOpen ? 'material-appbar' : undefined}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			{!isB2B && (
				<Dialog
					open={addMeterIsOpen}
					onClose={handleMeterClose}
					aria-labelledby="form-dialog-title"
					style={{ minWidth: 400 }}
				>
					<DialogTitle id="form-dialog-title">Новый счетчик</DialogTitle>

					<DialogContent>
						<DialogContentText>
							Введите идентификатор нового счетчика. Он указан на информационной наклейке, находящейся на
							коробке счетчика.
						</DialogContentText>

						<TextField
							autoFocus
							margin="dense"
							label="Идентификатор"
							type="meter_id"
							fullWidth
							onChange={event => {
								setMeterId(event.target.value);
							}}
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleMeterClose} color="default">
							Отмена
						</Button>

						<Button
							onClick={() => {
								handleMeterClose();

								fetch(`${SERVICE_API_URL}/b2c/addmeter?meterId=${meterId}`, {
									headers: new Headers({
										'content-type': 'application/json',
										Authorization: `Bearer ${getJwt()}`
									})
								}).then(() => document.location.reload());
							}}
							color="primary"
						>
							Добавить
						</Button>
					</DialogActions>
				</Dialog>
			)}

			{isB2B && (
				<Dialog
					open={addEventIsOpen}
					onClose={handleEventClose}
					aria-labelledby="form-dialog-title"
					style={{ minWidth: 400 }}
				>
					<DialogTitle id="form-dialog-title">Добавить новость</DialogTitle>

					<DialogContent>
						<DialogContentText>Введите текст новости, которую увидят все жильцы дома.</DialogContentText>

						<TextField
							autoFocus
							margin="dense"
							label="Текст новости"
							type="event_text"
							fullWidth
							onChange={event => {
								setEventText(event.target.value);
							}}
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleEventClose} color="default">
							Отмена
						</Button>

						<Button
							onClick={() => {
								handleEventClose();

								fetch(`${SERVICE_API_URL}/feed/new`, {
									method: 'POST',
									body: JSON.stringify({
										BuildingId: houseId,
										Text: eventText
									}),
									headers: new Headers({
										'content-type': 'application/json',
										Authorization: `Bearer ${getJwt()}`
									})
								});
							}}
							color="primary"
						>
							Добавить
						</Button>
					</DialogActions>
				</Dialog>
			)}

			{renderMenu}
		</div>
	);
};

export default withRouter(TopAppBar);
