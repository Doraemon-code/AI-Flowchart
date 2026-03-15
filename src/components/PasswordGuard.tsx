import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { Eye, EyeOff, Lock } from 'lucide-react'

interface PasswordGuardProps {
  onAuthenticated: () => void
}

export function PasswordGuard({ onAuthenticated }: PasswordGuardProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password.trim()) {
      setError('请输入访问密码')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 验证密码是否正确
      const response = await fetch('/api/models', {
        headers: {
          'X-Access-Password': password.trim(),
        },
      })

      if (response.ok) {
        localStorage.setItem('ai-flowchart-access-password', password.trim())
        onAuthenticated()
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.error || '访问密码错误')
      }
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-primary">AI-FlowChart</h1>
          <p className="mt-2 text-sm text-muted">请输入访问密码以使用服务</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="访问密码"
              className="pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '验证中...' : '确认'}
          </Button>
        </form>
      </div>
    </div>
  )
}