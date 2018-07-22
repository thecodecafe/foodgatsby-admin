import React from 'react';
import {
    Route, 
    Switch
} from 'react-router-dom';
import {
    DashboardPage, LoginPage, NotFoundPage, RestaurantsPage,
    AddRestaurantPage, EditRestaurantPage, UsersPage, LogoutPage
} from './_kernel';

const App = () => {
    return(
        <Switch>
            <Route exact path="/"  component={DashboardPage} />
            <Route exact path="/restaurants"  component={RestaurantsPage} />
            <Route exact path="/restaurants/add"  component={AddRestaurantPage} />
            <Route exact path="/restaurants/:id/edit"  component={EditRestaurantPage} />
            <Route exact path="/users"  component={UsersPage} />
            <Route exact path="/auth/login"  component={LoginPage} />
            <Route exact path="/auth/logout"  component={LogoutPage} />
            <Route component={NotFoundPage} />
        </Switch>
    );
};

export default App;