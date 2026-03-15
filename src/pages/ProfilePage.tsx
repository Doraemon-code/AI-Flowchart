import { useState, useEffect } from 'react'
import { AppSidebar, AppHeader } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { Settings, Eye, EyeOff } from 'lucide-react'

const PASSWORD_STORAGE_KEY = 'ai-draw-access-password'

export function ProfilePage() {
  const [activeTab] = useState('settings')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { success, error: showError } = useToast()

  useEffect(() => {
    // 加载已保存的密码
    setPassword(localStorage.getItem(PASSWORD_STORAGE_KEY) || '')
  }, [])

  const handleSavePassword = () => {
    if (!password.trim()) {
      showError('请输入访问密码')
      return
    }
    localStorage.setItem(PASSWORD_STORAGE_KEY, password.trim())
    success('访问密码已保存')
  }

  const handleResetPassword = () => {
    localStorage.removeItem(PASSWORD_STORAGE_KEY)
    setPassword('')
    success('访问密码已清除')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <AppHeader />
        <div className="flex flex-1 items-start justify-center px-8 pt-12">
          <div className="w-full max-w-3xl rounded-xl border border-border bg-surface shadow-sm">
            <div className="flex min-h-[500px]">
              {/* 左侧 Tab */}
              <div className="w-48 border-r border-border p-4">
                <nav className="space-y-1">
                  <button
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-primary text-surface'
                        : 'text-muted hover:bg-background hover:text-primary'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>设置</span>
                  </button>
                </nav>
              </div>

              {/* 右侧内容区 */}
              <div className="flex-1 p-6">
                <h2 className="mb-6 text-lg font-medium text-primary">设置</h2>

                {/* 访问密码 */}
                <PasswordSection
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  onSave={handleSavePassword}
                  onReset={handleResetPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface PasswordSectionProps {
  password: string
  setPassword: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
  onSave: () => void
  onReset: () => void
}

function PasswordSection({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSave,
  onReset,
}: PasswordSectionProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-primary">API 访问密码</h3>
      <div className="space-y-3">
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入访问密码"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted">
          输入正确的访问密码后，才能使用内置的 API 服务。
        </p>
        <div className="flex gap-2">
          <Button size="sm" onClick={onSave}>
            保存
          </Button>
          <Button size="sm" variant="outline" onClick={onReset}>
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}
