import API from '@/api/prod_manag';
import { PlusOutlined } from '@ant-design/icons';
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
                            <Button size="small" onClick={()=>editCargoKind(data)}>修改</Button>
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
        cargo_kind:{
            ck_name:'',
            ck_code:'',
            intro:'',
            type:1
        },
        cargo_attrs:[
            {
                attr_name:'',
                attr_value:'',
                type:1
            }
        ]
    })
    const [type,setType] = useState('')


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

    function editCargoKind(data){
        console.log(data)
        API.getCargoKindDetail(data.ck_id).then(res=>{
            if(res.status===200){
                setFormData({
                    ...res?.data,
                    cargo_attrs:res?.data?.cargo_attrs?.length?res?.data?.cargo_attrs:[
                        {
                            attr_name:'',
                            attr_value:'',
                            type:1
                        }
                    ],
                })
                setType('edit')
                setIsShow(true)      
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
        API.addCargoKind(formData).then(res=>{
            if(res.status===200){
                message.success('新增成功')
                setIsShow(false)
                searchCargoKind()
                setFormData({
                    cargo_kind:{
                        ck_name:'',
                        ck_code:'',
                        intro:'',
                        type:1
                    },
                    cargo_attrs:[
                        {
                            attr_name:'',
                            attr_value:'',
                            type:1
                        }
                    ]
                })
            }
        })
    }

    useEffect(()=>{
        if(!isShow){
            setType('')
            setFormData({
                cargo_kind:{
                    ck_name:'',
                    ck_code:'',
                    intro:'',
                    type:1
                },
                cargo_attrs:[
                    {
                        attr_name:'',
                        attr_value:'',
                        type:1
                    }
                ]
            })
        }
    },[isShow])

    useEffect(()=>{
        console.log(formData)
    },[formData])

    const onValuesChange = (changeValues)=>{
        setFormData({
            ...formData,
            ...changeValues
        })
    }

    const addAttrType = ()=>{
        let arr = formData.cargo_attrs

        arr.push({
            attr_name:'',
            attr_value:'',
            type:1
        })
        setFormData({
            ...formData,
            cargo_attrs:arr
        })
    }

    const handleRadioChange = (i,val)=>{
        let arr = formData.cargo_attrs
        arr[i].type = val
        setFormData({
            cargo_kind:formData.cargo_kind,
            cargo_attrs:arr
        })
    }

    const handleAttrNameChange = (i,val)=>{
        let arr = formData.cargo_attrs
        arr[i].attr_name = val
        setFormData({
            cargo_kind:formData.cargo_kind,
            cargo_attrs:arr
        })
    }

    const handleAttrValChange = (i,val)=>{
        let arr = formData.cargo_attrs
        arr[i].attr_value = val
        setFormData({
            cargo_kind:formData.cargo_kind,
            cargo_attrs:arr
        })
    }


    return(
        <>
            <div className="jxc-prod-management">
                <header>
                    <Input placeholder="请输入种类名称或编码 " 
                    onChange={(e)=>setSearch(e.target.value)}
                    style={{width:240,marginRight:16}}></Input>
                    <Button type="primary" 
                    onClick={searchCargoKind}
                    style={{marginRight:16}}>搜索</Button>
                    {/* <div style={{flex:1}}></div> */}
                    <Button type="primary" onClick={()=>{
                        setIsShow(true)
                        setType('add')
                        }}>新增货品种类</Button>
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
                        width={600}
                        getContainer={document.getElementsByClassName('jxc-prod-management')[0]}
                        onCancel={()=>setIsShow(false)}>
                    <div className="form-content">
                        <Form onFinish={onFinish}
                              onValuesChange={onValuesChange}>
                            <Form.Item label="种类名称">
                                <Input value={formData.cargo_kind.ck_name}
                                        onChange={(e)=>{
                                            setFormData({
                                                cargo_kind:{
                                                    ...formData.cargo_kind,
                                                    ck_name:e.target.value
                                                },
                                                cargo_attrs:formData.cargo_attrs
                                            })
                                        }}
                                        placeholder='请输入' 
                                        style={{width:320}}></Input>
                            </Form.Item>
                            <Form.Item label="种类编码">
                                <Input value={formData.cargo_kind.ck_code}
                                        onChange={(e)=>{
                                            setFormData({
                                                cargo_kind:{
                                                    ...formData.cargo_kind,
                                                    ck_code:e.target.value
                                                },
                                                cargo_attrs:formData.cargo_attrs
                                            })
                                        }}
                                         placeholder='请输入' style={{width:320}}></Input>
                            </Form.Item>
                            <Form.Item label="种类简介">
                                <TextArea value={formData.cargo_kind.intro}
                                        onChange={(e)=>{
                                            setFormData({
                                                cargo_kind:{
                                                    ...formData.cargo_kind,
                                                    intro:e.target.value
                                                },
                                                cargo_attrs:formData.cargo_attrs
                                            })
                                        }} placeholder='请输入' style={{width:320}}></TextArea>
                            </Form.Item>
                            <Form.Item label="种类类型">
                                <Radio.Group value={formData.cargo_kind.type}
                                 onChange={(e)=>{
                                    setFormData({
                                        cargo_kind:{
                                            ...formData.cargo_kind,
                                            type:e.target.value
                                        },
                                        cargo_attrs:formData.cargo_attrs
                                    })
                                }}>
                                    <Radio value={1}> 物料 </Radio>
                                    <Radio value={2}> 制品</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="规格类型">
                                {
                                    formData?.cargo_attrs?.map((item,index)=>{
                                        return <div className="type-content">
                                        <Radio.Group value={item.type} 
                                                    onChange={(e)=>handleRadioChange(index,e.target.value)}>
                                            <Radio value={1}> 选择 </Radio>
                                            <Radio value={2}> 文本</Radio>
                                        </Radio.Group>
                                        <div className="input-box">
                                            <Input placeholder="请输入规格名称" 
                                                    value={item.attr_name}
                                                    onChange={(e)=>handleAttrNameChange(index,e.target.value)}
                                                    style={{marginRight:16,width:180}}></Input>
                                            <Input placeholder={item.type===2?'请输入货品默认规格可以为空':'换行配置多选项，第一行为默认选项'} 
                                                    value={item.attr_value}
                                                    onChange={(e)=>handleAttrValChange(index,e.target.value)}
                                                    style={{width:240}}></Input>
                                        </div>
                                    </div>
                                    })
                                }
                            </Form.Item>
                            <Form.Item>
                            <div className="add-btn" onClick={addAttrType}>
                                <PlusOutlined style={{color:'#1677ff'}}/>
                            </div>
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