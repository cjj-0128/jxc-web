import API from '@/api/prod_manag';
import { Button, Form, Input, message, Modal, Pagination, Radio, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
const { confirm } = Modal;

// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const [form] = Form.useForm();

    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const columns = [
        {
            title: '种类名称',
            dataIndex: 'ck_name',
            key: 'ck_name',
        },{
            title: '种类编码',
            dataIndex: 'ck_code',
            key: 'ck_code',
        },{
            title: '种类简介',
            dataIndex: 'intro',
            key: 'intro',
        },{
            title: '种类类型',
            dataIndex: 'type',
            key: 'type',
            render:(val)=>{
                return(
                    <>
                        <Tag color="blue">
                            {val===1?'物料':'制品'}
                        </Tag>
                    </>
                )
            }
        },{
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            render:(val,data)=>{
                return (
                    <>
                        <Space size={8}>
                            <Button danger size="small" onClick={()=>delCargoKind(data)}>删除</Button>
                            <Button size="small">修改</Button>
                        </Space>
                    </>
                )
            }
        }
    ]
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)
    const [size,setSize] = useState(15)
    const [isShow,setShow] = useState(false)
    const [isDelShow,setDelShow] = useState(false)

    useEffect(()=>{
        searchCargoKind()
    },[])
    
    function searchCargoKind(){
        API.searchCargoKind({
            page,
            size,
            search
        }).then(res=>{
            if(res.status===200){
                setData(res.data?.data)
                setTotal(res.data?.total)
            }
        })
    }

    function delCargoKind(data){
        confirm({
            title: '删除',
            content: <div style={{paddingTop:20}}>
                请问是否删除?
            </div>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
              API.delCargoKind(data?.ck_id).then(res=>{
                if(res.status===200){
                    message.open({
                        type: 'success',
                        content: '删除成功',
                      });
                    searchCargoKind()
                }
              })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }



    return(
        <>
            <div className="jxc-prod-management">
                <header>
                    <Input placeholder="请输入货品code或货品名称" 
                    onChange={(e)=>setSearch(e.target.value)}
                    style={{width:240,marginRight:16}}></Input>
                    <Button type="primary" 
                    onClick={searchCargoKind}
                    style={{marginRight:16}}>搜索</Button>
                    {/* <div style={{flex:1}}></div> */}
                    <Button type="primary" onClick={()=>setShow(true)}>新增货品种类</Button>
                </header>

                <div className="jxc-table">
                    <Table columns={columns} dataSource={data} />
                </div>

                <div className="jxc-pagination">
                    <Pagination total={total} 
                                pagination={false}
                                current={1}></Pagination>
                </div>

                <Modal open={isShow} 
                        title="新增"
                        okText="确定"
                        cancelText="取消"
                        getContainer={document.getElementsByClassName('jxc-prod-management')[0]}
                        onCancel={()=>setShow(false)}>
                    <div className="form-content">
                        <Form>
                            <Form.Item label="种类名称" style={{width:320}}>
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类编码" style={{width:320}}>
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类简介" style={{width:320}}>
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类类型" style={{width:320}}>
                                <Radio.Group>
                                    <Radio value={1}> 物料 </Radio>
                                    <Radio value={2}> 制品</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="货品规格" style={{width:320}}>
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal open={isDelShow} 
                        title="删除">

                </Modal>
            </div>
        </>
    )
}