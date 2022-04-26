import { Suspense, lazy, createContext, useMemo, useState } from "react";

const Router = lazy(() => import("./AppRouter"));

export const UserContext = createContext({
  userAddress: "",
  setUserAddress: () => {},
  contractWithSigner: null,
  setContractWithSigner: () => {},
});

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [contractWithSigner, setContractWithSigner] = useState(null);
  const value = useMemo(
    () => ({
      userAddress,
      setUserAddress,
      contractWithSigner,
      setContractWithSigner,
    }),
    [contractWithSigner, userAddress]
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
