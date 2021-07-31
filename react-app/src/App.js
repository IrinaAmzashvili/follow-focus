import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User";
import TutorialsPage from "./components/TutorialsPage";
import Footer from "./components/Footer";
import IndividualTutorialPage from "./components/IndividualTutorialPage";
import SplashPage from './components/SplashPage';
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
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
          <ProtectedRoute path="/users" exact>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/tutorials" exact>
            <TutorialsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/tutorials/:id" exact>
            <IndividualTutorialPage />
          </ProtectedRoute>
          <Route path="/" exact>
            <SplashPage sessionUser={sessionUser}/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
