import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Content = ({ children, classes }) => (
    <div className={classes.root}>
        { children }
    </div>
);

const styles = theme => ({
    root: {
      padding: theme.spacing.unit * 3,
    }
});

export default withStyles(styles)(Content);