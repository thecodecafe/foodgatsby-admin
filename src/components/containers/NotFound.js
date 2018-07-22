import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import primary from '@material-ui/core/colors/blue';

let NotFound  = ({classes, history}) => (
    <div className={classes.root}>
        <div className={classes.content}>
            <div>
                <Typography className={classes.header}>404 Page Not Found</Typography>
            </div>
            <div>
                <Typography className={classes.message}>
                    The page you are looking for has either been moved or does not exist.
                </Typography>
            </div>
            <div className={classes.linksContainer}>
                <a href='javascript:;' className={classes.link} onClick={() => history.goBack()}>Go Back</a> 
                {` or `}
                <a href='javascript:;' className={classes.link} onClick={() => history.replace('/')}>Go Home</a>
            </div>
        </div>
    </div>  
);

const styles = theme => ({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff'
    },
    content: {
        width: '100%',
        maxWidth: 450
    },
    header: {
        fontSize: 24,
        fontWeight: 600,
        maxWidth: 450,
        marginTop: 150,
        textAlign: 'left'
    },
    message: {
        fontSize: 14,
        fontWeight: 600,
        maxWidth: 450,
        textAlign: 'left'
    },
    linksContainer: {
        textAlign: 'left'
    },
    link: {
        color: primary[600],
        textDecoration: 'none'
    }
});

export default withStyles(styles)(withRouter(NotFound));