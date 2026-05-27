# 🚀 阿里云部署指南

## 📋 准备工作

### 1. 注册阿里云账号
- 访问：https://www.aliyun.com
- 注册并实名认证

### 2. 开通必要服务
- **函数计算 (FC)**：https://www.aliyun.com/product/fc
- **对象存储 (OSS)**：https://www.aliyun.com/product/oss
- **CDN**（可选，用于加速访问）

### 3. 安装 Serverless Devs
```bash
# 安装 Serverless Devs 工具
npm install -g @serverless-devs/s

# 配置阿里云密钥
s config add
```

---

## 🛠️ 部署步骤

### 第一步：准备配置

1. 创建 `.env` 文件或使用环境变量
2. 修改以下配置（可选）：
   - 区域：`cn-hangzhou`（更改为您附近的区域）
   - 内存大小：512MB（默认）

### 第二步：部署后端（函数计算 FC）

```bash
# 进入后端目录
cd /workspace/backend

# 构建项目
npm run build
npm run prisma:generate

# 返回项目根目录
cd /workspace

# 部署（使用 Serverless Devs）
s deploy backend
```

或使用阿里云控制台手动部署：

1. 进入 函数计算 FC 控制台
2. 创建服务 → 选择 "Node.js 18"
3. 上传代码（打包 backend/dist 目录）
4. 配置触发器（HTTP 触发器）
5. 设置环境变量：
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=file:./prod.db
   JWT_SECRET=您的密钥
   ENCRYPTION_SECRET_KEY=您的密钥
   CORS_ORIGIN=*
   ```

### 第三步：部署前端（对象存储 OSS）

```bash
# 构建前端
cd /workspace/frontend
npm run build

# 返回项目根目录
cd /workspace

# 部署静态资源到 OSS
s deploy frontend
```

或手动部署：

1. 进入 OSS 控制台
2. 创建 Bucket（注意：名字需全网唯一）
3. 设置 Bucket 为 "公共读"
4. 上传前端构建文件（dist 目录内容）
5. 开启 "静态网站托管"：
   - 索引页：`index.html`
   - 404 页：`index.html`

### 第四步：配置 CDN（可选，推荐）

1. 进入 CDN 控制台
2. 添加加速域名
3. 配置源站为 OSS 域名
4. 开启 HTTPS（必须）
5. 等待配置生效（约 5-10 分钟）

---

## 🌐 访问应用

部署完成后：

- **后端 API**: `https://xxx.xxx.aliyuncs.com`
- **前端**: `https://your-bucket.oss-cn-hangzhou.aliyuncs.com` 或 CDN 域名
- **管理后台**: `/admin` 路径

---

## ⚙️ 免费额度

阿里云免费额度（新用户）：

- **函数计算 (FC)**：
  - 每月 100万次调用
  - 每月 400,000 GB-s（相当于 512MB 内存运行约 31 天）

- **对象存储 (OSS)**：
  - 5GB 标准存储
  - 每月 5GB 外网流出流量

- **CDN**：
  - 新用户有试用额度

---

## 📊 优势

1. **国内访问快**：阿里云服务器在国内
2. **稳定可靠**：阿里云 SLA 99.9%+
3. **成本低廉**：按使用量计费，小流量几乎免费
4. **自动扩展**：高并发自动扩容

---

## 🔐 安全提示

1. 密钥不要提交到代码仓库
2. 使用密钥管理服务（KMS）保存敏感信息
3. 开启 OSS 防盗链
4. 配置 CORS 仅允许您的域名访问

---

## 🚀 快速部署命令

```bash
# 1. 构建项目
cd /workspace/backend && npm run build
cd /workspace/frontend && npm run build

# 2. 部署
cd /workspace
s deploy
```

---

## 💡 遇到问题？

- 阿里云文档：https://help.aliyun.com/
- 函数计算文档：https://help.aliyun.com/product/50980.html
- OSS 文档：https://help.aliyun.com/product/31815.html

需要详细的部署视频教程？或者需要我帮您解决具体问题？
