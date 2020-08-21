import request from '@/utils/request'
const url = 'http://192.168.2.100:89'
export function getAdminInfo () {
  return request({
    url: url+"admin/info",
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function methods () {
  return request({
    url: url + '/admin/methods',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function permissByRole (roleId) {
  return request({
    url: url + '/admin/permissionsByRole',
    method: 'post',
    params: {
      roleId: roleId
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function savePermissionsByRole (roleId, data) {
  return request({
    url: url + '/admin/savePermissionsByRole',
    method: 'post',
    params: {
      roleId: roleId
    },
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRole (roleId) {
  return request({
    url: url + '/admin/delRole',
    method: 'post',
    params: {
      roleId: roleId
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delGroup (id) {
  return request({
    url: url + '/admin/delGroup',
    method: 'post',
    params: { id: id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
