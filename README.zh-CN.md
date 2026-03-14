# AI Diagram Hub

<div align="center">

**一个 AI 驱动的图表创作平台**

[🇺🇸 English](README.md) | [🇨🇳 中文](#readme)

![许可证](https://img.shields.io/badge/license-MIT-blue.svg)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-orange.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

</div>

---

## 🎯 项目简介

**AI Diagram Hub** 是一个 AI 驱动的图表创作平台。用自然语言描述你想要的图表，AI 自动为你生成。

基于 Cloudflare Pages 构建，采用 React 前端和 Pages Functions 后端。

## ✨ 核心特性

### 🖥️ 三种绘图引擎

三种不同的绘图引擎，满足不同场景需求：

| 引擎 | 特点 | 适用场景 |
|------|------|----------|
| **Mermaid** | 代码驱动，精确控制 | 流程图、时序图、类图 |
| **Excalidraw** | 手绘风格，清新美观 | 头脑风暴、草图绘制 |
| **Draw.io** | 专业编辑器，功能丰富 | 复杂图表、专业文档 |

### 📁 直观的项目管理

- ✅ 轻松管理所有图表项目
- ✅ 完整的版本历史，可恢复到任意历史版本
- ✅ **数据完全本地存储**，无隐私担忧

### 🎨 卓越的绘图体验

- **⚡ 秒级响应** - 几乎所有图表秒级渲染，无需等待
- **🎭 美观样式** - 特别优化的 Mermaid 渲染，美观度显著提升
- **🧠 智能编辑** - 支持基于现有图表继续编辑，AI 理解上下文
- **📐 空间感知** - 更优的布局能力，减少元素间箭头交叉

### 🔄 多模态输入

除了文本描述，还支持：

| 输入方式 | 说明 |
|----------|------|
| **📄 文档可视化** | 上传文档，自动生成可视化图表 |
| **🖼️ 图片重绘** | 上传图片，AI 识别并重绘图表 |
| **🔗 链接解析** | 输入网址，自动解析内容生成图表 |

## 🚀 快速开始

### 方式一：首页快速生成

1. 打开首页
2. 选择绘图引擎（Mermaid / Excalidraw / Draw.io）
3. 输入图表描述，例如："画一个用户登录流程图"
4. 点击生成 - AI 将自动创建项目并绘制图表

### 方式二：项目管理

1. 进入项目页面
2. 点击"新建项目"
3. 选择引擎并为项目命名
4. 在编辑器中使用聊天面板描述需求

## 💡 使用技巧

### AI 聊天生成

在编辑器右侧聊天面板中，你可以：

```
• 描述新图表："画一个电商结账流程图"
• 修改现有图表："将支付节点改为红色"
• 添加元素："添加一个库存检查步骤"
```

### 手动编辑

- **Excalidraw** - 直接在画布上拖拽绘制
- **Draw.io** - 使用专业图表编辑工具
- **Mermaid** - 直接编辑代码

### 版本管理

1. 点击工具栏的"历史"按钮
2. 查看所有历史版本
3. 点击任意版本预览
4. 点击"恢复"回退到该版本

## 🛠️ 本地开发

### 1. 克隆并安装依赖

```bash
git clone https://github.com/liujuntao123/smart-ai-draw
cd smart-ai-draw
pnpm install
```

### 2. 配置环境变量

在根目录创建 `.dev.vars` 文件：

```env
AI_API_KEY=your-api-key
AI_BASE_URL=https://api.openai.com/v1
AI_PROVIDER=openai
AI_MODEL_ID=gpt-4o-mini
```

> 💡 支持 OpenAI、Anthropic 及其他 OpenAI 兼容服务

### 3. 启动开发服务器

```bash
# 同时启动前端 + 后端
pnpm run dev
# 访问 http://localhost:8787

# 或分别启动：
pnpm run dev:frontend   # 仅 Vite (http://localhost:5173)
pnpm run dev:backend    # 仅 Wrangler Pages (http://localhost:8787)
```

**注意**: 开发时访问 `http://localhost:8787`（wrangler 代理 vite）

## 📦 Cloudflare Pages 部署

### 1. 构建

```bash
pnpm run build        # TypeScript 检查 + Vite 构建
```

### 2. 配置生产环境密钥

```bash
wrangler pages secret put AI_API_KEY
wrangler pages secret put AI_BASE_URL
wrangler pages secret put AI_PROVIDER
wrangler pages secret put AI_MODEL_ID
```

或在 Cloudflare Pages 仪表板中配置环境变量。

### 3. 部署

```bash
pnpm run pages:deploy
```

### 支持的 AI 服务

| 服务商 | AI_PROVIDER | AI_BASE_URL | 推荐模型 |
|--------|-------------|-------------|----------|
| OpenAI | openai | https://api.openai.com/v1 | gpt-5 |
| Anthropic | anthropic | https://api.anthropic.com/v1 | claude-sonnet-4-5 |
| 其他兼容服务 | openai | 自定义 URL | - |

## 🧰 技术栈

| 层次 | 技术 |
|------|------|
| 前端 | React 19 + Vite + TypeScript + Tailwind CSS |
| 状态管理 | Zustand |
| 数据存储 | Dexie.js (IndexedDB) |
| 后端 | Cloudflare Pages Functions |

## 📄 许可证

MIT

---

<div align="center">
  <strong>🌟 用 AI 轻松创作图表！</strong>
</div>
