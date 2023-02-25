import Header from '@/components/header';
import useRoute from '@/routes';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './index.scss';
const {  Sider } = Layout;


// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const navigate = useNavigate();
    const [routes,menus,defaultRoute] = useRoute();
    const [openKeys, setOpenKeys] = useState(['/prod','/prod-management']);
    const [selectedKey,setSelectedKey] = useState(['/prod-management'])
    
    useEffect(()=>{
        let path = window.location.href.split('/#/')[1]
        setOpenKeys(['/prod',`/${path}`])
    },[])

    const renderMenus = useMemo(() => {
        const newMenus = _.cloneDeep(menus);
        return newMenus;
      }, [menus]);

    const onClickMenuItem = (e)=>{
        const key = e.key;
        setOpenKeys(['/prod',key])
        navigate(key)
    }

    useEffect(()=>{
        setSelectedKey(openKeys)
    },[openKeys])

    const defaultNavigate = useMemo(() => {
        return <Navigate to={defaultRoute} />;
      }, [defaultRoute]);

    return(
        <>
            <Layout style={{height:'100%'}}>    
                <Sider width="190">
                    <Menu mode="inline"
                          items={renderMenus}
                          selectedKeys={selectedKey}
                          openKeys={openKeys}
                          onOpenChange={setOpenKeys}
                          onClick={onClickMenuItem}
                          style={{
                            height: '100%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                          }}></Menu>
                </Sider>

                <div className='mainContainer'>
                    <Header></Header>
                    <div className="jxc-content">
                    <Suspense fallback={<div>加载中...</div>}>
                        <Routes>
                            {routes.map((route, index) => {
                                return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<route.component/>}
                                />
                                );
                            })}
                            <Route path="*" element={defaultNavigate} />
                        </Routes>
                    </Suspense>
                    </div>
                </div>
            </Layout>
        </>
    )
}