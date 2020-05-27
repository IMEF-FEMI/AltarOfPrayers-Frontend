const navbarStyle = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		border: '0',
		padding: '0.625rem 0',
		// marginBottom: '20px',
		color: '#fff',
		width: '100%',
		backgroundColor: theme.palette.primary.dark,
		boxShadow: '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
		transition: 'all 150ms ease 0s',
		alignItems: 'center',
		flexFlow: 'row nowrap',
		justifyContent: 'flex-start',
		position: 'relative'
	},
	container: {
		paddingRight: '15px',
		paddingLeft: '15px',
		marginRight: '15px',
		marginLeft: '15px',
		width: '100%',
		minHeight: '50px',
		flex: '1',
		alignItems: 'center',
		justifyContent: 'space-between',
		display: 'flex',
		flexWrap: 'nowrap'
	},
	drawer: {
		color: '#fff',
		backgroundColor: theme.palette.primary.dark,
		width: '100%',
		minHeight: '50px',
		flex: '1',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		display: 'flex',
		flexWrap: 'nowrap',
		paddingTop: '15px',
		paddingBottom: '15px'
	},
	flex: {
		flex: 1
	},
	link: {
		fontFamily: [ 'Nunito Sans', 'sans-serif' ],
		'&:hover': {
			color: theme.palette.secondary.light
		}
	},
	active: {
		color: theme.palette.secondary.main
	},
	avatar: {
		margin: theme.spacing()
	},
	menuButton: {
		'&:focus': {
			backgroundColor: theme.palette.primary.dark
		}
	},
	closeButton: {
		width: '100%',
		'&:focus': {
			backgroundColor: theme.palette.primary.dark
		}
	}
});

export default navbarStyle;
