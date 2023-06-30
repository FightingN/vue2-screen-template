import request from 'utils/request'
export function getFetchMIMCToken(data) {
  return request({
    baseURL: 'https://mimc.chat.xiaomi.net/api/account/token',
    method: 'POST',
    data
  })
}
