/**
 * 访问密码管理服务
 * 用于存储和验证 API 访问密码
 */

const PASSWORD_STORAGE_KEY = 'ai-draw-access-password'

export const accessService = {
  /**
   * 获取存储的访问密码
   */
  getAccessPassword(): string {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) || ''
  },

  /**
   * 保存访问密码
   */
  setAccessPassword(password: string): void {
    localStorage.setItem(PASSWORD_STORAGE_KEY, password)
  },

  /**
   * 清除访问密码
   */
  clearAccessPassword(): void {
    localStorage.removeItem(PASSWORD_STORAGE_KEY)
  },

  /**
   * 是否已设置访问密码
   */
  hasAccessPassword(): boolean {
    return !!this.getAccessPassword()
  },
}
