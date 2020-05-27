import React from 'react';
import  withStyles  from '@material-ui/core/styles/withStyles';
import dashStyle from '../styles/dashStyle';

const Dash = ({ classes }) => {
	return <div className={classes.border} />;
};

export default withStyles(dashStyle)(Dash);
