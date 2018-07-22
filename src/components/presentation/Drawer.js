import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import RestaurantIcon from '@material-ui/icons/Store';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UsersIcon from '@material-ui/icons/People';
import grey from '@material-ui/core/colors/grey';


const AppDrawer = ({classes, navigate, active}) => (
<Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
    <div className={classes.toolbar} />
    {/* navigation list */}
    <List component="nav">
        {/* dashboard */}
        <ListItem button onClick={() => navigate('/')} 
            className={`${active == 'Dashboard' ? classes.activeMenu : ''}`}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <Typography className={classes.menuLabel}>Dashboard</Typography>
        </ListItem>
        {/* restauranta */}
        <ListItem button onClick={() => navigate('/restaurants')}
            className={`${active == 'Restaurants' ? classes.activeMenu : ''}`}>
            <ListItemIcon>
                <RestaurantIcon />
            </ListItemIcon>
            <Typography className={classes.menuLabel}>Restaurants</Typography>
        </ListItem>
        {/* users */}
        <ListItem button onClick={() => navigate('/users')}
            className={`${active == 'Users' ? classes.activeMenu : ''}`}>
            <ListItemIcon>
                <UsersIcon />
            </ListItemIcon>
            <Typography className={classes.menuLabel}>Users</Typography>
        </ListItem>
    </List>
</Drawer>
);

const styles = theme => {
    console.log(theme);
    return {
    drawerPaper: {
        position: 'relative',
        width: 250,
        backgroundColor: theme.palette.grey.dark
    },
    toolbar: theme.mixins.toolbar,
    activeMenu: {
        backgroundColor: grey[200]
    },
    menuLabel: {
        fontSize: '0.9em'
    }
}};

export default withStyles(styles)(AppDrawer);