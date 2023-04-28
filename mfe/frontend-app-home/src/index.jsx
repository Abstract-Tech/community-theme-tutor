import "babel-polyfill";

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from "@edx/frontend-platform";
import { AppProvider, ErrorPage } from "@edx/frontend-platform/react";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";


import appMessages from "./i18n";
import LandingPage from "./Components/Landing_page/Landing_page";

import "./index.scss";
import NotFoundPage from "./Components/NotFoundPage";
// import About from "./Components/Course_About/Course_about";

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <main>
        <Switch>
          <Route path="*" component={LandingPage} />
          {/* <Route path="/courses/:courseId/about" component={About} /> */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </AppProvider>,
    document.getElementById("root")
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById("root")
  );
});

initialize({
  messages: [appMessages],
});