import API from '@/api/prod_manag';
import { Button, Form, Input, message, Modal, Pagination, Radio, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
const { confirm } = Modal;
const { TextArea } = Input;

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
    const [isShow,setIsShow] = useState(false)
    const [isDelShow,setDelShow] = useState(false)
    const [formData,setFormData] = useState({
        type:1,
        created_at:1
    })

    useEffect(()=>{
        searchCargoKind()
    },[page,size])
    
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

    const onFinish = (values)=>{
        console.log(values)
    }

    const onValuesChange = (changeValues)=>{
        setFormData({
            ...formData,
            ...changeValues
        })
        console.log(changeValues)
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
                    <Button type="primary" onClick={()=>setIsShow(true)}>新增货品种类</Button>
                </header>

                <div className="jxc-table">
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </div>

                <div className="jxc-pagination">
                    <Pagination total={total} 
                                pageSize={size}
                                current={page} 
                                onChange={(page,size)=>{
                                    setPage(page);
                                    setSize(size)
                                }}></Pagination>
                </div>

                <Modal open={isShow} 
                        title="新增"
                        footer={null}
                        autoComplete="off"
                        getContainer={document.getElementsByClassName('jxc-prod-management')[0]}
                        onCancel={()=>setIsShow(false)}>
                    <div className="form-content">
                        <Form onFinish={onFinish}
                              onValuesChange={onValuesChange}>
                            <Form.Item label="种类名称" style={{width:320}} name="ck_name">
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类编码" style={{width:320}} name="ck_code">
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类简介" style={{width:320}} name="intro">
                                <Input placeholder='请输入'></Input>
                            </Form.Item>
                            <Form.Item label="种类类型" style={{width:320}} name="type">
                                <Radio.Group defaultValue={1}>
                                    <Radio value={1}> 物料 </Radio>
                                    <Radio value={2}> 制品</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="规格类型" style={{width:320}} name="created_at">
                                <Radio.Group defaultValue={1}>
                                    <Radio value={1}> 选择 </Radio>
                                    <Radio value={2}> 文本</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="" style={{width:320}}>
                                <TextArea placeholder={formData.created_at===1?'换行配置多选项，第一行为默认选项':'请输入货品默认规格可以为空'}></TextArea>   
                            </Form.Item>
                           
                            <Form.Item 
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}>
                                <Space size={16}>
                                    <Button onClick={()=>setIsShow(false)}>取消</Button>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                </Space>
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