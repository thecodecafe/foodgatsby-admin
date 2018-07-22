import React, { Component } from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from "../../data/actionCreators";
import { withRouter } from 'react-router-dom';

class PageWrapper extends Component {
    
    static propTypes = {
        noAppbar: propTypes.bool,
        noDrawer: propTypes.bool,
        menuName: propTypes.string
    };

    static defaultProps = {
        noAppbar: false,
        noDrawer: false,
        menuName: null
    };

    componentDidMount() {
        this.toggleAppbar();
        this.toggleDrawer();
        this.setMenuName();
    }
    
    render() {
        return this.props.children;
    }
    
    toggleAppbar(){
        const {noAppbar, appbar, hideAppbar, showAppbar} = this.props;
        if(appbar.visible && noAppbar){
            hideAppbar();
            return;
        }

        if(!appbar.visible && !noAppbar){
            showAppbar();
            return;
        }
    }
    
    toggleDrawer(){
        const {noDrawer, drawer, hideDrawer, showDrawer} = this.props;
        if(drawer.visible && noDrawer){
            hideDrawer();
            return;
        }

        if(!drawer.visible && !noDrawer){
            showDrawer();
            return;
        }
    }

    setMenuName(){
        this.props.setMenuName(this.props.menuName || null);
    }
}

const mapStateToProps = (state) => {
    const {appbar, drawer} = state;
    return { appbar, drawer };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        hideAppbar : ActionCreators.hideAppbar,
        showAppbar : ActionCreators.showAppbar,
        showDrawer : ActionCreators.showDrawer,
        hideDrawer : ActionCreators.hideDrawer,
        setMenuName: ActionCreators.setMenuName
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageWrapper));