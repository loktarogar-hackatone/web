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

const TopAppBar: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
	const [open, setOpen] = React.useState(false);
	const [meterId, setMeterId] = React.useState('');

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

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
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

						<Button style={{ color: '#ffffff', marginRight: 20 }} onClick={handleClickOpen}>
							<AddIcon />
							<span style={{ marginLeft: 10 }}>Добавить счетчик</span>
						</Button>

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

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ minWidth: 400 }}>
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
					<Button onClick={handleClose} color="default">
						Отмена
					</Button>

					<Button
						onClick={() => {
							handleClose();

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

			{renderMenu}
		</div>
	);
};

export default withRouter(TopAppBar);
