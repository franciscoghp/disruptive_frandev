/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useMemo } from 'react';
import { getPermissionsRq } from '../api/permissions';
import { useAuth } from './AuthContext';

const PermissionContext = createContext({
  permissionsData: [''],
});

export const usePermission = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error('usePermission must be used within an PermissionsProvider');
  }

  return context;
};

const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [permissionsData, setPermissionsData] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();

  const callPermissions = async () => {
    try {
      const res = await getPermissionsRq();
      setPermissionsData(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (isAuthenticated) callPermissions();
  }, [isAuthenticated]);

  return (
    <PermissionContext.Provider
      value={{
        permissionsData,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export { PermissionContext, PermissionsProvider };


