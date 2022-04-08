import { Suspense, lazy } from "react";

const Router = lazy(() => import("./AppRouter"));

function App() {
  return (
    <Suspense fallback={<></>}>
      <Router />
    </Suspense>
  );
}

export default App;
