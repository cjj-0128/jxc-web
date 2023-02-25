import API from '@/api/prod_manag';
import { Button, Input, Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';


// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          }
    ]
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)
    const [size,setSize] = useState(15)

    useEffect(()=>{
        searchCargoKind()
    })
    
    function searchCargoKind(){
        API.searchCargoKind({
            page,
            size,
            search
        }).then(res=>{
            if(res.state===0){

            }
        })
    }



    return(
        <>
            <div className="jxc-prod-management">
                <header>
                    <Input placeholder="请输入货品code或货品名称" 
                    style={{width:240,marginRight:16}}></Input>
                    <Button type="primary">搜索</Button>
                    <div style={{flex:1}}></div>
                    <Button type="primary">新增货品种类</Button>
                </header>

                <div className="jxc-table">
                    <Table columns={columns} dataSource={data} />
                </div>

                <div className="jxc-pagination">
                    <Pagination total={0} 
                                current={1}></Pagination>
                </div>
            </div>
        </>
    )
}