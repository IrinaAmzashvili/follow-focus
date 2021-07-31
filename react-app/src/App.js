import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User';
import TutorialsPage from './components/TutorialsPage';
import Footer from './components/Footer';
import IndividualTutorialPage from './components/IndividualTutorialPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Switch>
          <Route path='/login' exact>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/tutorials' exact>
            <TutorialsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/tutorials/:id' exact>
            <IndividualTutorialPage />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact>
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
