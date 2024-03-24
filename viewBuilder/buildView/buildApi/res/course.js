
// import buildMockApi from '../mock/buildMockApi'
import request from '@/utils/request'
// const CRUD = buildMockApi('train/course-pack')

export function add(data) {
  // return CRUD.add(data)
  return request({
    url: '/add/train/course-pack',
    method: 'post',
    data
  })
}
export function edit(data) {
  // return CRUD.edit(data)
  return request({
    url: '/edit/train/course-pack',
    method: 'post',
    data
  })
}
export function getList(data) {
  // return CRUD.getList(data)
  return request({
    url: '/query/train/course-pack',
    method: 'get',
    params: data
  })
}

export function getOneById(data) {
  // return CRUD.getOneById(data)
  return request({
    url: '/query/train/course-pack/' + data.id,
    method: 'get'
  })
}

export function delById(data) {
  // return CRUD.delById(data)
  return request({
    url: '/delete/train/course-pack/' + data.id,
    method: 'post'
  })
}
