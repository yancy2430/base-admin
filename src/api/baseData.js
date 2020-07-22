import request from '@/utils/request'

const api = {
  ch: 'http://192.168.2.100:89/base/FruitGoods/header',
  chPage: 'http://192.168.2.100:89/base/FruitGoods/page',
  tables: 'http://192.168.2.100:89/base/tables',

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
