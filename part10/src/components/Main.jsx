import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryDetails from './RepositoryDetails';
import CreateReview from './CreateReview';
import CreateUser from './CreateUser';
import UserReviews from './UserReviews';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/review" exact>
          <CreateReview />
        </Route>
        <Route path="/reviews" exact>
          <UserReviews />
        </Route>
        <Route path="/user" exact>
          <CreateUser />
        </Route>
        <Route path="/:id" >
          <RepositoryDetails />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;