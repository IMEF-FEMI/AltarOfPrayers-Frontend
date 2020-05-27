import React from 'react';
import { Typography } from '@material-ui/core';
import Dash from '../components/Dash';
import { withStyles } from '@material-ui/core/styles';
import headerStyle from '../styles/headerStyle';

const Header = ({ classes, children }) => {
	return (
		<div>
			<Typography variant="h3" className={classes.heading}>
				{children}
			</Typography>
			<Dash />
		</div>
	);
};
export default withStyles(headerStyle)(Header);
