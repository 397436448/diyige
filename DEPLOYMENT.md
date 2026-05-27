# 🚀 AI 提示词生成器 - 部署指南

## 📋 项目概览

- **前端**: React + TypeScript + Vite
- **后端**: Express + TypeScript + Prisma
- **数据库**: SQLite (本地开发)

---

## ☁️ 一键部署到免费平台

### 🎯 方案一：Vercel (前端) + Render (后端) - 完全免费！

#### 第一步：准备 GitHub 仓库

1. 首先创建一个 GitHub 账号
2. 在 GitHub 上创建一个新的仓库
3. 上传你的代码到 GitHub

```bash
# 在项目目录中
git init
git add .
git commit -m "AI 提示词生成器初始提交"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

#### 第二步：部署后端到 Render

1. 访问 https://render.com
2. 使用 GitHub 账号登录
3. 点击 **New +** → **Web Service**
4. 选择你的 GitHub 仓库
5. 配置以下内容：
   - **Name**: 你的项目名称 (例如 ai-prompt-generator-api)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. 点击 **Create Web Service**
7. 等待部署完成，复制分配给你的 URL（例如：`https://your-api.onrender.com`）

#### 第三步：部署前端到 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **Add New** → **Project**
4. 选择你的 GitHub 仓库
5. 配置项目：
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
6. 添加环境变量（点击 **Environment Variables**）：
   - 名称：`VITE_API_URL`
   - 值：你的 Render 后端 URL (例如：`https://your-api.onrender.com`)
7. 点击 **Deploy**
8. 等待部署完成！

✅ 完成！你现在有了一个完全在线的 AI 提示词生成器！

---

### 🎯 方案二：其他免费部署选项

#### Netlify (前端)
1. 访问 https://netlify.com
2. 使用 GitHub 登录
3. 导入你的仓库
4. 配置：
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`
5. 添加环境变量：
   - `VITE_API_URL`: 你的后端地址

#### Railway (后端)
1. 访问 https://railway.app
2. 使用 GitHub 登录
3. 点击 **New Project** → **Deploy from repo**
4. 配置：
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`

---

## 📱 默认管理员账号

- **邮箱**: `admin@example.com`
- **密码**: `admin123`
- **角色**: 管理员

---

## 🛠️ 本地开发

### 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 启动服务

```bash
# 启动后端 (端口 3001)
cd backend
npm run dev

# 启动前端 (端口 5173)
cd frontend
npm run dev
```

---

## 📝 环境变量说明

### 后端 (Backend)
```env
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key-here
```

### 前端 (Frontend)
```env
VITE_API_URL=http://localhost:3001
```

---

## 🎉 功能特性

✅ 用户注册/登录
✅ 智能提示词生成（文生图/图生视频）
✅ 提示词智能润色
✅ 历史记录管理
✅ 自定义 API 配置
✅ 密码修改
✅ 管理后台界面
✅ 完整中文界面

---

## 💡 注意事项

1. **免费额度限制**：Render 和 Vercel 的免费套餐在不活动时会休眠，第一次访问可能需要几秒钟启动
2. **数据持久化**：免费部署中数据库是临时的，重启后会重置
3. **生产环境**：如需生产环境部署，建议使用付费方案和正式数据库

---

## 📧 支持

如有问题，欢迎检查代码或修改！
