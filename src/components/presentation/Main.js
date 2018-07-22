import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Main = ({ children, classes, showAppbar }) => (
    <main className={`${classes.content} ${!showAppbar ? classes.fullheight : '' }`}>
        { showAppbar && <div className={classes.toolbar} />}
        { children }
    </main>
);

const styles = theme => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      minWidth: 0, // So the Typography noWrap works
      maxHeight: '100%',
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    fullheight: {
        height: '100%'
    },
    padding: {
      padding: theme.spacing.unit * 3,
    }
});

export default withStyles(styles)(Main);