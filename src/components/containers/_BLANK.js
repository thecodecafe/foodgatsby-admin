import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

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
 * component template
 */
let Template = ({fn}) => (
    <div>
        <h1>BLANK</h1>
    </div>
);

/**
 * create styles and bind toapp template
 */
Template = withStyles(styles)(Template);

class BLANK extends Component {
    state = {

    };

    render = () => <Template {...this.prps()} fn={this.fn()} />

    fn = () => ({
        // bound functions go here
    })

    prps = () => ({
        // template props go here
    })
}

const mapStateToProps = (state) => ({ 
    // states go here
});

export default connect(mapStateToProps)(withRouter(BLANK));