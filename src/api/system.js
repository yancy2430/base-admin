import request from '@/utils/request'
const url = 'http://localhost:89'
const api = {
  tables: url+'/base/tables',

}
export function resources () {
  return request({
    url: url+'/system/resources',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function saveMenu (parameter) {
  return request({
    url: url+'/system/saveMenu',
    method: 'post',
    data: JSON.stringify(parameter),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function menu (id) {
  return request({
    url: url+'/system/menu',
    method: 'post',
    params: {id:id},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delMenu (id) {
  return request({
    url: url+'/system/delMenu',
    method: 'post',
    params: {id:id},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


