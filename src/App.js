import { Suspense, lazy, createContext, useMemo, useState } from "react";

const Router = lazy(() => import("./AppRouter"));

export const UserContext = createContext({
  userAddress: "",
  setUserAddress: () => {},
});

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const value = useMemo(() => ({ userAddress, setUserAddress }), [userAddress]);

  return (
    <UserContext.Provider value={value}>
      <Suspense fallback={<></>}>
        <Router />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
