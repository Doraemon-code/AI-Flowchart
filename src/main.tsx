import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 配置 Excalidraw 从本地加载资源（字体等）
// 设置后 Excalidraw 会从 /fonts/ 路径加载字体文件
window.EXCALIDRAW_ASSET_PATH = '/'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
