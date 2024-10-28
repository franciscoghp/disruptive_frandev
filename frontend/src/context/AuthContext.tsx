/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { loginT, userT } from '../types/userT';
import { registerRq, loginRq, verifyTokenRq } from '../api/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  user: null as userT | null,
  signUp: (user: userT) => {
    console.log(user);
  },
  isAuthenticated: false,
  errors: [''],
  signIn: (user: loginT) => {
    console.log(user);
  },
  loading: true,
  logout: () => {
    console.log('logout');
  },
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userT | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signUp = async (user: userT) => {
    try {
      const res = await registerRq(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrors(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signIn = async (user: loginT) => {
    try {
      const res = await loginRq(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrors(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timerError = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timerError);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRq(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error: any) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
        errors,
        signIn,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

