import request from '@/utils/request'
const url = 'http://localhost:89'
export function methods () {
  return request({
    url: url+'/admin/methods',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}