import request from '@/utils/request'
const url = 'http://localhost:8928'
const api = {
  tables: url+'/base/tables',
  fields: url+'/base/fields',
  saveFields: url+'/base/saveFields',
  saveOrUpdateHeader: url+'/base/saveOrUpdateHeader',
  allEnums: url+'/base/allEnums',
  enums: url+'/base/enums',
  options:url+"/base/options",
  trees:url+"/base/trees",
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}
export function header (module) {
  return request({
    url: url+'/base/'+module+'/header',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function page (parameter,data,module) {
  return request({
    url: url+'/base/'+module+'/page',
    method: 'post',
    params: parameter,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function tables () {
  return request({
    url: api.tables,
    method: 'get'
  })
}

export function allEnums () {
  return request({
    url: api.allEnums,
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

export function trees (table,pid) {
  return request({
    url: api.trees,
    method: 'get',
    params: {
      table:table,
      pid:pid,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getOptions (table,keyword) {
  return request({
    url: api.options,
    method: 'get',
    params: {
      table:table,
      keyword:keyword
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getEnums(hash) {
  console.log(hash)
  return request({
    url: api.enums,
    method: 'get',
    params: {
      hash:hash
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}