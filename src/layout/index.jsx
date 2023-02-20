import useRoute from '@/routes';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './index.scss';
const { Header, Content, Footer, Sider } = Layout;


// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const navigate = useNavigate();
    const [routes,menus] = useRoute();
    const [openKeys, setOpenKeys] = useState(['/prod','/prod-management']);
    const [selectedKey,setSelectedKey] = useState(['/prod/prod-management'])

    const renderMenus = useMemo(() => {
        const newMenus = _.cloneDeep(menus);
        return newMenus;
      }, [menus]);

    const onClickMenuItem = (e)=>{
        const key = e.key;
        console.log(key)
        navigate('/prod'+key)
    }

    useEffect(()=>{
        console.log(routes)
        setSelectedKey(openKeys)
    },[openKeys])

    const defaultNavigate = useMemo(() => {
        return <Navigate to={'/prod/prod-management'} />;
      }, []);

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
                     <Routes>
                        {routes.map((route, index) => {
                            return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.component />}
                            />
                            );
                        })}
                        <Route path="*" element={defaultNavigate} />
                     </Routes>
                </div>
            </Layout>
        </>
    )
}