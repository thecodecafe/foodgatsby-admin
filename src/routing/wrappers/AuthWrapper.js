import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class AuthWrapper extends Component {
    
    static propTypes = {
        returnable: propTypes.bool
    };

    static defaultProps = {
        returnable: false
    };

    componentDidMount() {
        this.leave();
    }

    componentDidUpdate(prevProps) {
        this.leave();
    }
    
    render() {
        return this.props.children;
    }
    
    leave(){
        const {auth, history, returnable} = this.props;
        var next = '/auth/login';
        if(returnable){
            next += '?next='+encodeURIComponent(window.location.pathname+window.location.search);
        }
        if(!auth.isAuthenticated){
            history.replace(next);
        }
    }
}

const mapStateToProps = ({auth}) => {
    return { auth }
}

export default connect(mapStateToProps)(withRouter(AuthWrapper));