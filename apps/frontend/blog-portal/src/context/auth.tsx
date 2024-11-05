import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { User } from "@/packages/types/user";

const { VITE_GRACE_PERIOD_IN_SECONDS = "600" } = import.meta.env;

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  showSessionExpiryPopup: boolean;
  setSessionExpiryWithMaxAge: (maxAge: number) => void;
  setShowSessionExpiryPopup: (show: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  showSessionExpiryPopup: false,
  setSessionExpiryWithMaxAge: () => {},
  setShowSessionExpiryPopup: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const gracePeriod = useMemo(() => Number(VITE_GRACE_PERIOD_IN_SECONDS) * 1000, []);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = useMemo(() => !!user, [user]);
  const [showSessionExpiryPopup, setShowSessionExpiryPopup] = useState<boolean>(false);

  const setSessionExpiryWithMaxAge = useCallback((maxAge: number) => {
    const maxAgeInMs = maxAge * 1000;
    const expiry =  maxAgeInMs - gracePeriod;
    console.log({ expiry });
    setShowSessionExpiryPopup(false);
    setTimeout(() => setShowSessionExpiryPopup(true), expiry);
  }, [setShowSessionExpiryPopup, gracePeriod]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, showSessionExpiryPopup, setSessionExpiryWithMaxAge, setShowSessionExpiryPopup }}>
      {children}
    </AuthContext.Provider>
  );
};
