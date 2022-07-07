import http from '@/utils/http'

// 获取用户列表
export function getUserQuery(params: any): Promise<any> {
  return http({
    url: 'user',
    method: 'get',
    params,
  })
}

// 创建用户
export function createUser(data: any): Promise<any> {
  return http({
    url: 'user',
    method: 'post',
    data,
  })
}

// 更新用户
export function updateUser(data: any,id:number): Promise<any> {
  return http({
    url: `user/${id}`,
    method: 'patch',
    data,
  })
}

// 删除用户用户
export function removeUser(id: number): Promise<any> {
  return http({
    url: `user/${id}`,
    method: 'delete',
  })
}

