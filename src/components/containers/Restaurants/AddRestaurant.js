import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import autobind from 'react-autobind';
import RestaurantForm from './RestaurantForm';
import Content from '../../presentation/Content';
import PageHeading from '../../presentation/PageHeading';


/**
 * here we have the styles for the root component
 * @param {object} theme 
 */
const styles = theme => ({
    content: {
        padding: theme.spacing.unit * 3
    }
});

/**
 * component template
 */
let Template = ({fn, classes}) => (
    <div className={classes.root}>
        <PageHeading title='Add Restaurant' subtitle='Add a new restaurant to the catalog'/>
        <Content>
            <RestaurantForm />
        </Content>
    </div>
);

/**
 * create styles and bind toapp template
 */
Template = withStyles(styles)(Template);

class AddRestaurant extends Component {
    state = {
    };

    constructor() {
        super();
        autobind(this);
    }

    render = () => <Template {...this.prps()} fn={this.fn()} />

    prps = () => ({
        
    })

    fn = () => ({
        
    })

    handleOnSaved = () => {
    }
}

const mapStateToProps = ({}) => ({ 
    
});

export default connect(mapStateToProps)(withRouter(AddRestaurant));