const aboutStyle = (theme) => ({
	padding: {
		padding: theme.spacing.unit * 2
	},
	avatar: {
		margin: theme.spacing.unit,
		width: 120,
		height: 120,
		[theme.breakpoints.up('md')]: {
			width: 240,
			height: 240
		}
	},
	body: {
		fontFamily: [ 'Nunito Sans', 'sans-serif' ],
		fontSize: '1rem'
	}
});
export default aboutStyle;
