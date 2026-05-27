# 🚀 Zeabur 部署指南

## 📋 目录
- [Zeabur 是什么？](#zeabur-是什么)
- [准备工作](#准备工作)
- [部署步骤](#部署步骤)
- [常见问题](#常见问题)

---

## Zeabur 是什么？

Zeabur 是来自台湾的云服务平台，特点是：
- ✅ 国内访问速度非常快
- ✅ 部署简单，支持一键部署
- ✅ 免费额度充足（1000 小时/月）
- ✅ 支持 Node.js、React、Vue 等主流技术栈
- ✅ 支持 GitHub 自动部署

---

## 准备工作

### 1. 有一个 GitHub 账号
如果没有，先去 https://github.com 注册

### 2. 将代码上传到 GitHub
如果还没有上传，请按以下步骤操作：

```bash
cd /workspace
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

然后去 GitHub 创建仓库，最后：
```bash
git remote add origin https://github.com/你的用户名/ai-prompt-generator.git
git push -u origin main
```

### 3. 注册 Zeabur 账号
访问 https://zeabur.com，用 GitHub 账号登录

---

## 部署步骤

### 第一步：创建 Zeabur 项目

1. 登录 Zeabur 后，点击右上角 "New Project"
2. 选择 "Deploy from GitHub"
3. 选择你刚才上传的仓库
4. 点击 "Deploy"（会自动检测并使用我们的 zeabur.toml 配置）

---

### 第二步：配置后端服务

1. 在项目页面，点击 "Add Service"
2. 选择 "Marketplace" 标签
3. 搜索 "Node.js" 或选择 "Node.js" 服务
4. 配置服务：
   - **服务名称**：`api`
   - **Root Directory**：`backend`
   - **Build Command**：`npm install && npm run prisma:generate && npm run build`
   - **Start Command**：`npm start`

5. **配置环境变量**（重要！）：
   - 点击服务名称进入设置
   - 找到 "Environment Variables" 部分
   - 添加以下变量：
     ```
     NODE_ENV = production
     PORT = 3001
     DATABASE_URL = file:./prod.db
     CORS_ORIGIN = *
     ```
   - 对于 `JWT_SECRET` 和 `ENCRYPTION_SECRET_KEY`：
     - 点击 "Add Variable" → 选择 "Secret"
     - 输入密钥名称，然后点击 "Generate" 生成随机密钥
     - 或者手动输入一个安全的随机字符串（至少 32 个字符）

6. 点击 "Deploy" 或 "Redeploy" 等待构建完成

---

### 第三步：获取后端地址

后端部署完成后，你会看到类似这样的 URL：
```
https://api-xxxxx.zeabur.app
```

**请复制这个 URL**，我们下一步要用到！

---

### 第四步：配置并部署前端

1. 回到项目页面，再次点击 "Add Service"
2. 选择 "Marketplace" → 选择 "Static Website" 或 "React"
3. 配置服务：
   - **服务名称**：`frontend`
   - **Root Directory**：`frontend`
   - **Build Command**：`npm install && npm run build`
   - **Output Directory**：`dist`

4. **配置环境变量**：
   - 找到 "Environment Variables"
   - 添加变量：
     ```
     VITE_API_URL = https://api-xxxxx.zeabur.app  (← 替换成你的后端地址！)
     ```
   - ⚠️ 注意：将 `api-xxxxx.zeabur.app` 替换成你第二步获取的实际地址

5. 点击 "Deploy" 等待构建完成

---

### 第五步：初始化管理员账户

部署完成后，我们需要创建管理员账户：

#### 方法一：通过网页注册（推荐）
1. 访问前端网站
2. 点击注册
3. 输入以下信息：
   - 邮箱：`admin@example.com`
   - 用户名：`admin`
   - 密码：`你想要的密码`

4. 注册成功后，我们需要修改数据库将角色改为 ADMIN
   - 这一步需要通过 Zeabur 的控制台或 API 来操作
   - 或者先使用普通用户角色

#### 方法二：通过 API 直接注册
```bash
curl -X POST https://你的后端地址.zeabur.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "username": "admin", "password": "你的密码"}'
```

---

## 🎉 完成！

部署成功后，你会有：
- **前端地址**：`https://frontend-xxxxx.zeabur.app`
- **后端地址**：`https://api-xxxxx.zeabur.app`
- **管理后台**：`https://frontend-xxxxx.zeabur.app/admin`

---

## 💡 后续优化

### 1. 绑定自定义域名（可选）
Zeabur 支持绑定自己的域名：
- 在服务设置中找到 "Domain"
- 添加你自己的域名
- 按照提示配置 DNS

### 2. 配置持久化数据库（推荐）
目前我们使用的是 SQLite 文件数据库，Zeabur 免费版重启后数据会丢失。
可以使用 Zeabur Marketplace 中的 PostgreSQL 或 MySQL 服务。

### 3. 开启自动部署
在项目设置中开启 "Auto Deploy"，每次推送到 GitHub 都会自动重新部署。

---

## ❓ 常见问题

### Q: 部署一直失败怎么办？
A: 检查以下几点：
1. 代码是否成功推送到 GitHub
2. Root Directory 是否正确（backend 或 frontend）
3. 环境变量是否都已设置
4. 查看 Zeabur 的构建日志

### Q: 国内访问速度怎么样？
A: 非常快！Zeabur 的节点在台湾，国内延迟一般在 50-100ms

### Q: 免费额度够用吗？
A: 对于个人项目完全够用！
- 每月 1000 小时（相当于全天运行）
- 超出后服务会休眠，首次访问需要 30 秒唤醒

### Q: 如何查看日志？
A: 在 Zeabur 服务页面，点击 "Logs" 标签即可查看

---

## 📞 需要帮助？

- Zeabur 文档：https://zeabur.com/docs
- Zeabur Discord 社区：https://discord.gg/zeabur

---

祝你部署顺利！🚀
