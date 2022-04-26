import { Suspense, lazy, createContext, useMemo, useState } from "react";

const Router = lazy(() => import("./AppRouter"));

export const UserContext = createContext({
  userAddress: "",
  setUserAddress: () => {},
  userSigner: null,
  setUserSigner: () => {},
});

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [userSigner, setUserSigner] = useState(null);

  const value = useMemo(
    () => ({ userAddress, setUserAddress, userSigner, setUserSigner }),
    [userAddress, userSigner]
  );

  return (
    <UserContext.Provider value={value}>
      <Suspense fallback={<></>}>
        <Router />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
