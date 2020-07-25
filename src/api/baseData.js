import request from '@/utils/request'
const url = 'http://localhost:89'
const api = {
  ch: url+'/base/FruitGoods/header',
  chPage: url+'/base/FruitGoods/page',
  tables: url+'/base/tables',
  fields: url+'/base/fields',
  saveFields: 'http://localhost:89/base/saveFields',
  saveOrUpdateHeader: 'http://localhost:89/base/saveOrUpdateHeader',
  enums: 'http://localhost:89/base/enums',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}
export function fruitGoodsHeader () {
  return request({
    url: api.ch,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function fruitGoodsList (parameter) {
  return request({
    url: api.chPage,
    method: 'post',
    params: parameter
  })
}

export function tables () {
  return request({
    url: api.tables,
    method: 'get'
  })
}

export function enums () {
  return request({
    url: api.enums,
    method: 'get'
  })
}

export function fields (parameter) {
  return request({
    url: api.fields,
    method: 'post',
    params: parameter
  })
}
export function saveFields (parameter) {
  return request({
    url: api.saveFields,
    method: 'post',
    data: JSON.stringify(parameter),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveOrUpdateHeader (parameter) {
  return request({
    url: api.saveOrUpdateHeader,
    method: 'post',
    data: JSON.stringify(parameter),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
