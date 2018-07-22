import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ActionCreators } from '../../data/actionCreators';
const logo = require('../../assets/logo-white.png');

const TopBar = ({classes, open, handleClose, handleMenu, anchorEl, user}) => (
<AppBar position="absolute" className={classes.appBar}>
    <Toolbar>
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
            <Link to={'/'} className={classes.link}>
                <img src={logo} className={classes.logo} /><br/>Admin
            </Link>
        </Typography>

        {/* logged in user */}
        <div>
            <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open} onClose={handleClose}>

                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
            </Menu>
        </div>
    </Toolbar>
</AppBar>
);

const styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
        width: 128
    },
    title: {
        flex: 1,
        fontSize: 12,
        fontWeight: 400,
    },
    link: {
        color: '#fff',
        textTransform: 'capitalize',
        textDecoration: 'none'
    }
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout: ActionCreators.logout
}, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(TopBar));