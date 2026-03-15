import type { Env } from './types'

/**
 * 验证访问密码（强制模式）
 * @returns { valid: boolean, exempt: boolean, reason?: string }
 * - valid: 请求是否有效
 * - exempt: 是否免除配额消耗（密码验证成功后免除）
 * - reason: 拒绝原因
 */
export function validateAccessPassword(request: Request, env: Env): { valid: boolean; exempt: boolean; reason?: string } {
  const password = request.headers.get('X-Access-Password')
  const configuredPassword = env.ACCESS_PASSWORD

  // 后端未配置密码，拒绝所有请求
  if (!configuredPassword) {
    return { valid: false, exempt: false, reason: '服务未配置访问密码' }
  }

  // 未携带密码，拒绝访问
  if (!password) {
    return { valid: false, exempt: false, reason: '请先输入访问密码' }
  }

  // 密码错误，拒绝访问
  if (password !== configuredPassword) {
    return { valid: false, exempt: false, reason: '访问密码错误' }
  }

  // 密码正确，允许访问并免除配额
  return { valid: true, exempt: true }
}
