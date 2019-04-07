import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { RouteComponentProps, withRouter } from 'react-router';
import { removeJwt } from '../../utils';

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

const TopAppBar: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);

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
					<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
						<MenuIcon />
					</IconButton>

					<Typography className={classes.title} variant="h6" color="inherit" noWrap>
						ЖКХ
					</Typography>

					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						{/*<IconButton color="inherit">*/}
						{/*<Badge badgeContent={17} color="secondary">*/}
						{/*<NotificationsIcon />*/}
						{/*</Badge>*/}
						{/*</IconButton>*/}

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

			{renderMenu}
		</div>
	);
};

export default withRouter(TopAppBar);
