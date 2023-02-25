import axios from 'axios';

//新增
export function addCargoKind(data) {
    return axios.post('/cargo_kind', data);
}
// 修改
export function editCargoKind(data) {
    return axios.put('/cargo_kind', data);
}
// 搜索
export function searchCargoKind(data) {
    return axios.get('/cargo_kind/_search',{
        params:data
    });
}
// 获取货品详情
export function getCargoKindDetail(id) {
    return axios.get('/cargo_kind/'+id);
}
// 删除货品
export function delCargoKind(id) {
    return axios.delete('/cargo_kind/'+id);
}

export default {
    addCargoKind,
    editCargoKind,
    searchCargoKind,
    getCargoKindDetail,
    delCargoKind
}