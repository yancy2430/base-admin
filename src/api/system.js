import request from '@/utils/request'
const url = 'http://192.168.2.100:89'
export function resources () {
  return request({
    url: url + '/system/resources',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function saveMenu (parameter) {
  return request({
    url: url + '/system/saveMenu',
    method: 'post',
    data: JSON.stringify(parameter),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function menu (id) {
  return request({
    url: url + '/system/menu',
    method: 'post',
    params: { id: id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delMenu (id) {
  return request({
    url: url + '/system/delMenu',
    method: 'post',
    params: { id: id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function roleList () {
  return request({
    url: url + '/admin/roleList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function addRole (data) {
  return request({
    url: url + '/admin/addRole',
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function addGroup (data) {
  return request({
    url: url + '/admin/addGroup',
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
