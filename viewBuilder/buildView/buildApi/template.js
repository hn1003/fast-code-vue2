function str(
  url
) {
  return `
// import buildMockApi from '../mock/buildMockApi'
import request from '@/utils/request'
// const CRUD = buildMockApi('${url}')

export function add(data) {
  // return CRUD.add(data)
  return request({
    url: '/school/add/${url}',
    method: 'post',
    data
  })
}
export function edit(data) {
  // return CRUD.edit(data)
  return request({
    url: '/school/edit/${url}',
    method: 'post',
    data
  })
}
export function getList(data) {
  // return CRUD.getList(data)
  return request({
    url: '/school/query/${url}/list',
    method: 'get',
    params: data
  })
}

export function getOneById(data) {
  // return CRUD.getOneById(data)
  return request({
    url: '/school/query/${url}/' + data.id,
    method: 'get'
  })
}

export function delById(data) {
  // return CRUD.delById(data)
  return request({
    url: '/school/delete/${url}/' + data.id,
    method: 'post'
  })
}
`
}
module.exports = str
