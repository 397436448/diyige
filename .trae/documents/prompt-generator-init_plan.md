
# AI提示词生成器 - 项目初始化计划

## 概述
本计划将创建 AI 提示词生成器项目的基础结构，包括前端和后端项目初始化、配置文件和基础目录结构。

## 目标
- 创建完整的前端和后端项目结构
- 配置现代化的开发环境
- 确保项目符合现代 Web 开发最佳实践

## 实施步骤

### 1. 创建基础目录结构
- 在 `/workspace` 下创建 `frontend/` 和 `backend/` 目录
- 确保目录权限正确

### 2. 初始化前端项目 (React + TypeScript + Vite)
- 使用 Vite 创建 React + TypeScript 项目
- 配置项目基础依赖
- 创建基础项目结构（components, hooks, services, pages 等）
- 配置 ESLint 和 Prettier（如需要）
- 创建 `.env.example` 文件用于环境变量模板

### 3. 初始化后端项目 (Node.js + Express + TypeScript)
- 初始化 npm 项目
- 安装 Express、TypeScript 和相关依赖
- 配置 TypeScript 编译选项
- 创建基础项目结构（src/routes, src/controllers, src/middleware, src/models 等）
- 配置开发和生产脚本
- 创建 `.env.example` 文件

### 4. 创建项目根级配置文件
- 创建根级 `.gitignore` 文件（包含前后端的忽略规则）
- 创建根级 `README.md` 说明文档
- 确保所有项目配置完整

### 5. 验证项目结构
- 确保所有目录和文件创建成功
- 验证项目可以正常安装依赖
- 验证项目可以正常启动开发服务器

## 技术栈

### 前端
- **框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **路由**: React Router（后续添加）
- **UI组件库**: 待定（如 shadcn/ui 或 Ant Design）
- **状态管理**: 待定（如 Redux Toolkit 或 Zustand）

### 后端
- **运行时**: Node.js
- **框架**: Express
- **语言**: TypeScript
- **数据库**: 待定（如 PostgreSQL 或 MongoDB）
- **ORM/ODM**: 待定
- **认证**: JWT（后续添加）

## 预期结果
完成后，项目将包含：
```
/workspace/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── .gitignore
└── README.md
```
