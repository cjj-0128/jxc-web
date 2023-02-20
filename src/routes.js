import { useMemo, lazy } from 'react';
import _ from 'lodash';

export const routes = [
    {
        path: '/',
        component: lazy(() => import('@/pages/home')),
      }
]

const useRoute = (rawUserInfo) => {
    const permissionRoutes = useMemo(() => {
      return routes;
    }, []);
  
    return [permissionRoutes];
  };
  
  export default useRoute;