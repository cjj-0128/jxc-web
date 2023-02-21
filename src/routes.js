import { lazy, useMemo } from 'react';

export const routes = [
  {
    path: '/prod-management',
    component: lazy(() => import('@/pages/ProdManagement'))
  },
  {
    path: '/raw-material-management',
    component: lazy(() => import('@/pages/RawMaterialManagement'))
  },
  {
    path: '/products-management',
    component: lazy(() => import('@/pages/ProductsManagement'))
  }
]

export const menus = [
  {
    key:'/prod',
    label:'生产管理',
    children:[
      {
        key:'/prod-management',
        label:'种类管理',
      },
      {
        key:'/raw-material-management',
        label:'原材料管理',
      },
      {
        key:'/products-management',
        label:'制品管理',
      }
    ]
  }
]

const useRoute = (rawUserInfo) => {
    const permissionRoutes = useMemo(() => {
      return routes;
    }, []);

    const defaultRoute = '/prod-management'
  
    return [permissionRoutes,menus,defaultRoute];
  };
  
  export default useRoute;