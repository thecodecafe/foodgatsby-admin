import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Request from '../../helpers/Request';

class GuestWrapper extends Component {
    
    static propTypes = {
        redirectTo: propTypes.string
    };

    static defaultProps = {
        redirectTo: '/'
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
        const {auth, history, redirectTo} = this.props;

        var  request = new Request();
        var next = request.get('next', null) || redirectTo;
            next = decodeURIComponent(next);

        if(auth.isAuthenticated){
            history.replace(next);
        }
    }
}

const mapStateToProps = ({auth}) => {
    return { auth }
}

export default connect(mapStateToProps)(withRouter(GuestWrapper));