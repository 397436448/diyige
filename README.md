# AI 提示词生成器

一个用于生成高质量 AI 提示词的全栈 Web 应用。

## 功能特性

- 🎨 **文生图 (Text to Image)** 提示词生成
- 🎬 **图生视频 (Image to Video)** 提示词生成
- ✨ 提示词智能润色
- 🔐 用户认证系统（注册、登录）
- 💾 历史记录管理（收藏、删除）
- ⚙️ 用户 API 配置管理
- 📱 现代化响应式设计

## 技术栈

### 前端
- React 18 + TypeScript
- Vite (构建工具)
- React Router (路由)
- 原生 CSS (无额外 UI 框架)

### 后端
- Node.js + TypeScript
- Express (Web 框架)
- Prisma ORM (数据库)
- SQLite (开发环境)
- JWT 认证
- bcryptjs (密码加密)
- crypto-js (API Key 加密)

## 快速开始

### 前置要求
- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 后端
cd backend && npm install

# 前端
cd ../frontend && npm install
```

### 初始化数据库

```bash
cd backend

# 生成 Prisma Client
npm run prisma:generate

# 推送数据库 schema
npm run prisma:push
```

### 启动开发服务器

终端 1 - 后端 (端口 3001):
```bash
cd backend && npm run dev
```

终端 2 - 前端 (端口 5173):
```bash
cd frontend && npm run dev
```

### 访问应用
打开浏览器访问 `http://localhost:5173`

## 项目结构

```
/workspace
├── frontend/              # 前端应用
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── pages/        # 页面组件
│   │   ├── contexts/     # React Context
│   │   ├── services/     # API 服务
│   │   ├── styles/       # 样式文件
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/              # 后端 API
│   ├── src/
│   │   ├── controllers/  # 控制器（业务逻辑）
│   │   ├── routes/       # 路由定义
│   │   ├── middleware/   # 中间件
│   │   ├── services/     # 核心服务（提示词生成）
│   │   ├── utils/        # 工具函数
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma # 数据库 schema
│   └── package.json
├── .gitignore
└── README.md
```

## 主要功能页面

1. **首页** - 提示词生成器
2. **历史** - 历史记录管理
3. **设置** - API 配置
4. **登录/注册** - 用户认证

## API 端点

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 提示词
- `POST /api/prompt/generate` - 生成提示词
- `POST /api/prompt/refine` - 润色提示词

### 历史记录
- `GET /api/history` - 获取历史记录
- `DELETE /api/history/:id` - 删除历史记录
- `POST /api/history/:id/favorite` - 切换收藏状态

### 配置
- `GET /api/config` - 获取配置
- `POST /api/config` - 保存配置
- `DELETE /api/config/:id` - 删除配置

## 开发说明

### 添加新的提示词模板
编辑 `backend/src/services/promptService.ts` 中的模板数组。

### 数据库修改
1. 修改 `backend/prisma/schema.prisma`
2. 运行 `npm run prisma:push`

## License

MIT
