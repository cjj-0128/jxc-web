import axios from 'axios';

//修改货品
export function editCargo(data) {
    return axios.put('/cargo', data);
}

//新增货品
export function addCargo(data) {
    return axios.post('/cargo', data);
}

//搜索货品
export function searchCargo(data) {
    return axios.get('/cargo/_search', {
        params:data
    });
}

//获取货品详情
export function getCargoDetail(id) {
    return axios.get('/cargo/'+id);
}

//删除货品
export function delCargo(id) {
    return axios.delete('/cargo/'+id);
}

//上传图片
export function uploadImg(data) {
    return axios.post('/image',data);
}

export default {
    editCargo,
    addCargo,
    searchCargo,
    getCargoDetail,
    delCargo,
    uploadImg
}