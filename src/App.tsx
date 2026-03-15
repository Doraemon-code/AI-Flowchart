import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TooltipProvider, Toaster } from '@/components/ui'
import { PasswordGuard } from '@/components/PasswordGuard'
import { HomePage, ProjectsPage, EditorPage, ProfilePage } from '@/pages'

const PASSWORD_STORAGE_KEY = 'ai-flowchart-access-password'

function App() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // 检查是否已有保存的密码
    const password = localStorage.getItem(PASSWORD_STORAGE_KEY)
    if (password) {
      // 验证密码是否有效
      fetch('/api/models', {
        headers: { 'X-Access-Password': password },
      })
        .then((res) => {
          if (res.ok) {
            setAuthenticated(true)
          } else {
            // 密码无效，清除并要求重新输入
            localStorage.removeItem(PASSWORD_STORAGE_KEY)
            setAuthenticated(false)
          }
        })
        .catch(() => {
          // 网络错误，允许进入但会在实际使用时报错
          setAuthenticated(true)
        })
    } else {
      setAuthenticated(false)
    }
  }, [])

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted">加载中...</div>
      </div>
    )
  }

  if (!authenticated) {
    return <PasswordGuard onAuthenticated={() => setAuthenticated(true)} />
  }

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/editor/:projectId" element={<EditorPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  )
}

export default App
