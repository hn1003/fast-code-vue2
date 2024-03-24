
// import buildMockApi from '../mock/buildMockApi'
import request from '@/utils/request'
// const CRUD = buildMockApi('role')

export function add(data) {
  // return CRUD.add(data)
  return request({
    url: '/school/add/role',
    method: 'post',
    data
  })
}
export function edit(data) {
  // return CRUD.edit(data)
  return request({
    url: '/school/edit/role',
    method: 'post',
    data
  })
}
export function getList(data) {
  // return CRUD.getList(data)
  return request({
    url: '/school/query/role/list',
    method: 'get',
    params: data
  })
}

export function getOneById(data) {
  // return CRUD.getOneById(data)
  return request({
    url: '/school/query/role/' + data.id,
    method: 'get'
  })
}

export function delById(data) {
  // return CRUD.delById(data)
  return request({
    url: '/school/delete/role/' + data.id,
    method: 'post'
  })
}
