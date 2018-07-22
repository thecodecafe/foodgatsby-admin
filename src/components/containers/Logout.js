import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { ActionCreators } from '../../data/actionCreators';
const logo = require('../../assets/logo.png');

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
        overflow: 'auto'
    },
    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%'
    }
});

let Template = ({fn, classes}) => (
    <div className={`${classes.root}`}>
        <Paper className={classes.loader}> <LinearProgress color='primary' /> </Paper>
    </div>  
);
Template = withStyles(styles)(Template)

class Logout extends Component {
    state = {
        
    };

    componentDidMount() {
        this.handleLogout();
    }

    render = () => <Template {...this.prps()} fn={this.fn()} />

    prps = () => ({

    })

    fn = () => ({

    })

    handleLogout = () => {
        const { loggingOut } = this.props;
        if(loggingOut.isFetching) return;
        this.props.logout();
    }
}

const mapStateToProps = ({ loggingOut }) => ({ loggingOut });

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: ActionCreators.logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));