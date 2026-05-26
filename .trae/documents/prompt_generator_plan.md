# AI提示词生成器 - 实现计划

## 1. 研究结论
本次需要从零开始构建一个完整的 AI 提示词生成器全栈 Web 应用，包含前端和后端。项目具有以下核心功能：
- 用户认证系统（支持普通用户和管理员角色
- 智能提示词分析与生成（支持文生图和图生视频场景）
- 提示词智能润色功能
- 用户自主 AI API 配置
- 历史记录管理
- 后台管理面板
- 响应式 UI 设计

已有的规格文档包括：
- [spec.md](file:///workspace/.trae/specs/prompt-generator/spec.md) - 完整的功能规格说明
- [tasks.md](file:///workspace/.trae/specs/prompt-generator/tasks.md) - 详细的任务分解清单
- [checklist.md](file:///workspace/.trae/specs/prompt-generator/checklist.md) - 验收检查清单

## 2. 主要文件和模块
### 新建文件和目录结构：
```
/workspace/
├── frontend/              # 前端项目 (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
├── backend/             # 后端项目 (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── .env.example
├── README.md
└── LICENSE
```

## 3. 实现步骤
### 阶段 1：项目初始化与技术栈搭建
1. 创建 frontend/ 和 backend/ 目录结构
2. 初始化前端项目 (React + TypeScript + Vite)
3. 初始化后端项目 (Node.js + Express + TypeScript)
4. 配置 Prisma ORM 和 SQLite 数据库
5. 配置 ESLint、Prettier、环境变量模板
6. 创建 package.json 配置和基础依赖
7. 配置 .gitignore 文件

### 阶段 2：用户认证系统
1. 设计 Prisma User 数据模型
2. 实现后端注册和登录 API
3. 实现 JWT 认证和角色鉴权中间件
4. 创建前端登录/注册页面
5. 实现前端路由和认证状态管理
6. 前后端联调

### 阶段 3：智能提示词生成核心功能
1. 实现意图分析模块
2. 设计并实现提示词模板库
3. 实现提示词生成引擎
4. 实现模糊输入引导逻辑
5. 实现后端生成 API
6. 创建前端提示词生成页面

### 阶段 4：提示词润色和 API 配置
1. 实现提示词润色引擎
2. 实现后端润色 API
3. 实现 UserApiConfig 数据模型和加密工具
4. 实现后端配置 CRUD API
5. 创建前端设置页面

### 阶段 5：历史记录管理
1. 实现 PromptHistory 数据模型
2. 实现历史记录 CRUD API
3. 实现收藏功能 API
4. 创建前端历史记录页面

### 阶段 6：后台管理面板
1. 实现仪表盘统计 API
2. 实现用户管理 API
3. 实现广告管理 API
4. 实现内容管理 API
5. 创建后台管理页面

### 阶段 7：UI 界面优化与响应式适配
1. 设计统一设计语言
2. 实现桌面端和移动端布局
3. 添加交互动效

### 阶段 8：项目文档与收尾
1. 编写 README.md
2. 添加 LICENSE
3. 完善项目结构文档

## 4. 潜在依赖与考虑事项
- 技术栈选择保持一致：TypeScript + React + Express + Prisma + SQLite
- 任务依赖关系遵循 [tasks.md](file:///workspace/.trae/specs/prompt-generator/tasks.md) 中定义的依赖链
- 数据库使用 SQLite 以便于开发和部署
- 密钥加密使用 AES 算法
- JWT 用于身份认证
- 前端状态管理使用 React Context API 或 Zustand
- 图表库选用 Recharts 用于后台仪表盘

## 5. 风险处理
- 如遇到第三方 API 不稳定，采用内置模拟数据
- 确保遵循已定义的验收清单进行逐模块开发和测试
- 优先实现核心功能 MVP 再优化细节
