# 🚀 快速部署指南

## 三步搞定！

### 1️⃣ 上传代码到 GitHub

```bash
cd /workspace
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/ai-prompt-generator.git
git push -u origin main
```

### 2️⃣ 在 Zeabur 部署

1. 打开 https://zeabur.com
2. 用 GitHub 登录
3. 点击 "New Project"，选择你的仓库
4. Zeabur 会自动检测配置并开始部署！

### 3️⃣ 配置环境变量

**后端**：
- 进入 `api` 服务设置
- 添加环境变量：
  ```
  NODE_ENV=production
  PORT=3001
  DATABASE_URL=file:./prod.db
  JWT_SECRET=（点击 Generate 生成）
  ENCRYPTION_SECRET_KEY=（点击 Generate 生成）
  CORS_ORIGIN=*
  ```

**前端**：
- 进入 `frontend` 服务设置
- 添加环境变量：
  ```
  VITE_API_URL=你的后端地址（例如：https://api-xxxxx.zeabur.app）
  ```

---

## 📚 详细文档

更多详细信息请查看：[DEPLOY.md](file:///workspace/DEPLOY.md)

---

## 🌐 部署完成后

访问你的网站：`https://frontend-xxxxx.zeabur.app`

---

需要帮助？查看详细文档！
