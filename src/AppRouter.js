import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import CustomLayout from "./components/CustomLayout";

import FullScreenLoading from "./components/FullScreenLoading/FullScreenLoading";
import { pages } from "./configs/routes";
import { renderRoutes } from "./utils/routerUtils";

function AppRouter() {
  return (
    <BrowserRouter>
      <CustomLayout>
        <Suspense fallback={<FullScreenLoading />}>
          <Switch>{renderRoutes(pages)}</Switch>
        </Suspense>
      </CustomLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
