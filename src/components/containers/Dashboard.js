import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {

    };

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return { };
}

export default connect(mapStateToProps)(withRouter(Dashboard));