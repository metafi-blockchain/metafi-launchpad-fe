import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "react-block-ui/style.css";
import { Redirect, Router, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Web3ReactManager from "./library/Web3ReactManager";
import AppUpdater from "./hook/updater";
import CookiesPolicyPage from "./pages/cookies-policy";
import PrivacyPolicyPage from "./pages/privacy-policy";
import ProjectDetailPage from "./pages/project-detail";
import ProjectsPage from "./pages/projects";
import TermOfUsePage from "./pages/terms-conditions";
import { ROUTES } from "./shared/constants";
import { PrivateRoute } from "./shared/routes/PrivateRoute";
import { history } from "./shared/utils/history";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Web3ReactManager>
          <AppUpdater />
          <Switch>
            <PrivateRoute exact path={ROUTES.PROJECTS} component={ProjectsPage} />
            <PrivateRoute exact path={ROUTES.PROJECT_DETAIL} component={ProjectDetailPage} />
            <PrivateRoute exact path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicyPage} />
            <PrivateRoute exact path={ROUTES.COOKIES_POLICY} component={CookiesPolicyPage} />
            <PrivateRoute exact path={ROUTES.TERM_OF_USES} component={TermOfUsePage} />
            <Redirect from='**' to={ROUTES.PROJECTS} />
          </Switch>
        </Web3ReactManager>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;