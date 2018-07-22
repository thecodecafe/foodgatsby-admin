/**
 * here we load all our required libraries
 * for our app compoenent
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './configs/theme.config';
import Routes from './routing/routes';
import TopBar from './components/presentation/TopBar';
import AppDrawer from './components/presentation/Drawer';
import Main from './components/presentation/Main';
import Request from './helpers/Request';
import withRouter from 'react-router-dom/withRouter';
import { ActionCreators } from './data/actionCreators';

/**
 * here we have our application component's ui,
 * no side effect should occure here
 * this is used only for displaying UI
 */
const Template = ({fn, classes, anchorEl, menuName, showDrawer, showAppbar, ready}) => (
<div className={`app-container ${classes.root}`}>
    {/* app bar */}
    { showAppbar && 
        <TopBar handleClose={fn.handleClose} 
            handleMenu={fn.handleMenu}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} /> }

    {/* app drawer */}
    { showDrawer && <AppDrawer active={menuName} navigate={fn.navigate}/> }

    {/* main content */}
    <Main showAppbar={showAppbar}>
        { ready && <Routes /> }
    </Main>
</div>
);

/**
 * here we have the styles for the root component
 * @param {object} theme 
 */
const styles = theme => ({
    root: {
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    }
});

/**
 * create styles and bind toapp template
 */
const TemplateWithMUIStyles = withStyles(styles)(Template);


/**
 * here we define our app component sepeate from our template
 * this will allow us to easily sepearate the view from the logic
 */
class App extends Component {
    state = {
        ready: false,
        anchorEl: null
    };

    componentDidMount() {
        this.props.checkAuth();
    }

    componentDidUpdate(prevProps, prevState){
        // set the app as ready when done checking authentication state
        if(prevProps.checkingAuth.isFetching && !this.props.checkingAuth.isFetching){
            this.setState({ready: true});
        }
    }
    
    render = () => (<MuiThemeProvider theme={theme}>
                        <TemplateWithMUIStyles { ...this.prps() } fn={this.fn()}></TemplateWithMUIStyles>
                    </MuiThemeProvider>);

    fn()
    {
        return {
            // define functions here)
            handleMenu : this.handleMenu.bind(this),
            handleClose: this.handleClose.bind(this),
            navigate   : this.navigate.bind(this)
        } 
    }

    prps()
    {
        return {
            showAppbar  : this.props.appbar.visible,
            showDrawer  : this.props.drawer.visible,
            anchorEl    : this.state.anchorEl,
            menuName    : this.props.menuName.name,
            ready       : this.state.ready,
            checkingAuth: this.props.checkingAuth.isFetching
        } 
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (action) => {
        this.setState({ anchorEl: null });
        switch(action){
            case'logout':
                this.props.history.push('/auth/logout')
            break;
        }
    };

    navigate(route){
        this.props.history.push(route);
    }
}

/**
 * here we create a function which is used to map
 * our application state to our component's props.
 * @param {object} state 
 */
const mapStateToProps = ({appbar, drawer, menuName, checkingAuth}) => {
    return { appbar, drawer, menuName, checkingAuth };
}

/**
 * here we bind action creators to our store's dispatch action.
 * @param {object} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkAuth: ActionCreators.checkAuth
    }, dispatch);
}

/**
 * exporting the app as the defult component for this file.
 */
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));