import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import setAuthToken from './utils/setAuthToken';

// COMPONENTS
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/profile/:id' component={Profile} />

              <div className='container-center'>
                <Alert />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/profiles' component={Profiles} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={ProfileForm}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={ProfileForm}
                />
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </div>
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
