import { Route } from "react-router-dom";

export const renderRoutes = (routes) =>
  routes.map(({ path, exact, component: Component, title }) => (
    <Route key={path} path={path} exact={exact}>
      {Component && <Component />}
    </Route>
  ));
