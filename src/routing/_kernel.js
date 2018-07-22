import React from 'react';
import AuthWrapper from './wrappers/AuthWrapper';
import GuestWrapper from './wrappers/GuestWrapper';
import PageWrapper from './wrappers/PageWrapper';
import Dashboard from '../components/containers/Dashboard';
import Login from '../components/containers/Login';
import Logout from '../components/containers/Logout';
import NotFound from '../components/containers/NotFound';
import Restaurants from '../components/containers/Restaurants/Restaurants';
import AddRestaurant from '../components/containers/Restaurants/AddRestaurant';
import EditRestaurant from '../components/containers/Restaurants/EditRestaurant';
import Users from '../components/containers/Users/Users';

export const DashboardPage = (props) => (
  <AuthWrapper returnable>
    <PageWrapper menuName={'Dashboard'}><Dashboard/></PageWrapper>
  </AuthWrapper>
);

export const RestaurantsPage = (props) => (
  <AuthWrapper returnable>
    <PageWrapper menuName={'Restaurants'}><Restaurants/></PageWrapper>
  </AuthWrapper>
);

export const AddRestaurantPage = (props) => (
  <AuthWrapper returnable>
    <PageWrapper menuName={'Restaurants'}><AddRestaurant/></PageWrapper>
  </AuthWrapper>
);

export const UsersPage = (props) => (
  <AuthWrapper returnable>
    <PageWrapper menuName={'Users'}><Users/></PageWrapper>
  </AuthWrapper>
);

export const EditRestaurantPage = (props) => (
  <AuthWrapper returnable>
    <PageWrapper menuName={'Restaurants'}><EditRestaurant/></PageWrapper>
  </AuthWrapper>
);

export const LoginPage = (props) => (
  <GuestWrapper>
    <PageWrapper noAppbar noDrawer><Login/></PageWrapper>  
  </GuestWrapper>
);

export const LogoutPage = (props) => (
  <AuthWrapper>
    <PageWrapper noAppbar noDrawer><Logout/></PageWrapper>
  </AuthWrapper>
);

export const NotFoundPage = (props) => (
  <PageWrapper noAppbar noDrawer><NotFound/></PageWrapper>  
);