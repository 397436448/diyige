# Tasks

- [ ] Task 1: 项目初始化与技术栈搭建
  - [ ] 1.1 创建项目根目录结构，初始化前端项目（React + TypeScript + Vite）
  - [ ] 1.2 初始化后端项目（Node.js + Express + TypeScript）
  - [ ] 1.3 配置数据库（SQLite/PostgreSQL）与 ORM（Prisma）
  - [ ] 1.4 配置 ESLint、Prettier、环境变量模板（.env.example）
  - [ ] 1.5 创建 GitHub 仓库并完成初始提交

- [ ] Task 2: 用户认证系统（前后端联调）
  - [ ] 2.1 设计用户数据模型（User表：id, email, username, password_hash, role, created_at）
  - [ ] 2.2 实现后端注册 API（POST /api/auth/register）
  - [ ] 2.3 实现后端登录 API（POST /api/auth/login），返回 JWT
  - [ ] 2.4 实现 JWT 认证中间件与角色鉴权中间件
  - [ ] 2.5 创建前端登录页面（表单校验、错误提示）
  - [ ] 2.6 创建前端注册页面
  - [ ] 2.7 实现登录后角色路由分流（普通用户→前端主页，管理员→后台面板）

- [ ] Task 3: 智能提示词生成核心功能
  - [ ] 3.1 实现意图分析模块：解析用户输入，判断文生图/图生视频意图
  - [ ] 3.2 设计提示词模板库（文生图维度：主体、风格、光线、构图、画质；图生视频维度：运动、转场、时长、风格）
  - [ ] 3.3 实现提示词生成引擎：根据意图和模板组装结构化提示词
  - [ ] 3.4 实现模糊输入引导：当意图无法识别时返回引导问题
  - [ ] 3.5 实现后端生成 API（POST /api/prompt/generate）
  - [ ] 3.6 创建前端提示词输入与生成页面（输入框、生成按钮、结果展示区）

- [ ] Task 4: 提示词智能润色
  - [ ] 4.1 实现润色引擎：接收原始提示词，优化词汇和细节
  - [ ] 4.2 实现后端润色 API（POST /api/prompt/refine）
  - [ ] 4.3 前端润色按钮与对比展示（润色前后 diff 视图）

- [ ] Task 5: 用户AI API自主配置
  - [ ] 5.1 后端 UserApiConfig 数据模型（provider, api_key_encrypted, endpoint）
  - [ ] 5.2 实现密钥加密存储工具（AES加密）
  - [ ] 5.3 实现后端配置 CRUD API（GET/POST/PUT /api/user/config）
  - [ ] 5.4 实现API连接测试 API（POST /api/user/config/test）
  - [ ] 5.5 前端设置页面（API提供商选择、密钥输入、连接测试按钮）

- [ ] Task 6: 提示词历史管理
  - [ ] 6.1 后端 PromptHistory 数据模型（id, user_id, raw_input, result, type, refined_result, created_at）
  - [ ] 6.2 实现后端历史 CRUD API（GET/DELETE /api/prompt/history）
  - [ ] 6.3 实现收藏与取消收藏 API（POST /api/prompt/history/:id/favorite）
  - [ ] 6.4 前端历史记录页面（列表、分页、复制、删除、收藏）

- [ ] Task 7: 后台管理面板
  - [ ] 7.1 仪表盘页面：用户总数、今日生成量、活跃用户数统计 API 与图表展示
  - [ ] 7.2 用户管理页面：用户列表、搜索、筛选、禁用/启用、详情查看
  - [ ] 7.3 广告管理：AdSlot 数据模型，广告 CRUD 接口，前端广告位渲染
  - [ ] 7.4 内容管理：公告/帮助/模板库的 CMS 接口与编辑页面

- [ ] Task 8: UI界面优化与响应式适配
  - [ ] 8.1 设计统一设计语言（色彩体系、字体、间距、圆角、阴影）
  - [ ] 8.2 实现桌面端布局（侧边栏导航、卡片式内容、毛玻璃效果）
  - [ ] 8.3 实现移动端布局（底部导航、单列布局、触摸优化）
  - [ ] 8.4 添加交互动效（过渡动画、loading状态、骨架屏）

- [ ] Task 9: GitHub仓库上传与项目文档
  - [ ] 9.1 编写项目 README（功能介绍、技术栈、快速开始、项目结构）
  - [ ] 9.2 添加 LICENSE 文件
  - [ ] 9.3 创建并推送 GitHub 仓库

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3、Task 4、Task 5、Task 6 依赖 Task 2（需要认证）
- Task 7 依赖 Task 2（需要管理员认证）
- Task 8 依赖 Task 3、Task 4、Task 5、Task 6（需要前端页面就绪）
- Task 9 可在 Task 1 完成后随时进行，但在全部完成后最终推送