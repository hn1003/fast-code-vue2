
// import buildMockApi from '../mock/buildMockApi'
import request from '@/utils/request'
// const CRUD = buildMockApi('project')

export function add(data) {
  // return CRUD.add(data)
  return request({
    url: '/add/project',
    method: 'post',
    data
  })
}
export function edit(data) {
  // return CRUD.edit(data)
  return request({
    url: '/edit/project',
    method: 'post',
    data
  })
}
export function getList(data) {
  // return CRUD.getList(data)
  return request({
    url: '/query/project',
    method: 'get',
    params: data
  })
}

export function getOneById(data) {
  // return CRUD.getOneById(data)
  return request({
    url: '/query/project/' + data.id,
    method: 'get'
  })
}

export function delById(data) {
  // return CRUD.delById(data)
  return request({
    url: '/delete/project' + data.id,
    method: 'post'
  })
}
