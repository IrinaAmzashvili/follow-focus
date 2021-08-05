import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import TutorialsPage from "./components/TutorialsPage";
import Footer from "./components/Footer";
import IndividualTutorialPage from "./components/IndividualTutorialPage";
import SplashPage from "./components/SplashPage";
import LoggedOutNavbar from './components/LoggedOutNavbar';
import AboutUs from './components/AboutUs';
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
    {sessionUser ? (
      <NavBar />
      ) : null}
      <main>
        <Switch>
          {!sessionUser ? (
            <Route path='/' exact>
              <SplashPage />
              <LoggedOutNavbar />
              <AboutUs />
            </Route>
          ) : null}
          <ProtectedRoute path='/about-us' exact>
            <AboutUs />
          </ProtectedRoute>
          <ProtectedRoute path={`/users/${sessionUser?.id}`} exact>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/tutorials" exact>
            <TutorialsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/tutorials/:id" exact>
            <IndividualTutorialPage />
          </ProtectedRoute>
          <Route path="/" exact>
            <SplashPage sessionUser={sessionUser} />
          </Route>
          <Route>
            <h1>404 - Page not found</h1>
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
