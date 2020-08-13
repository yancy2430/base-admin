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
