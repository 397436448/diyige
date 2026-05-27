# 🚀 阿里云函数计算（免费）部署指南

## 📋 准备工作

### 1. 注册阿里云账号
- 访问：https://www.aliyun.com
- 完成实名认证（个人认证即可）

### 2. 开通必要服务
- **函数计算 (FC)**：https://www.aliyun.com/product/fc
- **对象存储 (OSS)**：https://www.aliyun.com/product/oss

---

## ⚙️ 部署后端（函数计算）

### 第一步：创建服务

1. 进入 [函数计算控制台](https://fc.console.aliyun.com)
2. 点击 **"创建服务"**
3. 填写：
   - 服务名称：`ai-prompt-generator`
   - 描述：AI提示词生成器后端API
   - 点击 **"确定"**

### 第二步：创建函数

1. 在服务中点击 **"创建函数"**
2. 选择：
   - **运行环境**：Node.js 18
   - **函数类型**：事件函数
   - **函数名称**：`api`

3. **代码配置**：
   - 选择 **"通过 OSS Bucket 上传代码包"**
   - 先跳过，后面手动上传

4. **环境变量**：
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=file:./dev.db
   JWT_SECRET=your-secure-secret-key
   CORS_ORIGIN=*
   ```

### 第三步：打包上传代码

1. 在本地打包：
   ```bash
   cd /workspace/backend
   npm install
   npm run build
   npm run prisma:generate
   
   # 创建 zip 包（只包含必要文件）
   mkdir -p deploy && cp -r dist node_modules package.json deploy/
   cd deploy && zip -r api.zip .
   ```

2. 在阿里云 OSS 创建 Bucket，上传 `api.zip`
3. 在函数计算中配置从 OSS 加载代码

### 第四步：配置触发器

1. 点击函数名称进入设置
2. 选择 **"触发器"** → **"创建触发器"**
3. 配置：
   - 触发器类型：HTTP
   - 认证方式：匿名
   - 方法：全部允许
   - 点击 **"确定"**

4. 获取触发器 URL（这就是你的后端地址）

---

## 🖼️ 部署前端（OSS）

### 第一步：创建 OSS Bucket

1. 进入 [OSS 控制台](https://oss.console.aliyun.com)
2. 点击 **"创建 Bucket"**
3. 配置：
   - Bucket 名称：`ai-prompt-frontend-你的用户名`（必须唯一）
   - 区域：选择离你近的（如杭州）
   - 读写权限：公共读

### 第二步：上传前端文件

1. 在本地构建前端：
   ```bash
   cd /workspace/frontend
   npm install
   npm run build
   ```

2. 在 OSS 控制台上传 `dist` 目录的所有文件

### 第三步：开启静态网站托管

1. 在 Bucket 设置中找到 **"静态网站托管"**
2. 开启：
   - 索引页：`index.html`
   - 404 页：`index.html`
3. 获取访问域名

---

## 🔗 配置前端 API 地址

1. 在前端的环境变量中设置：
   ```
   VITE_API_URL=你的函数计算触发器URL
   ```

2. 重新构建并上传前端

---

## 🎉 完成！

- **前端地址**：OSS 提供的域名
- **后端地址**：函数计算触发器 URL
- **管理后台**：`/admin` 路径

---

## 💡 注意事项

1. **数据库**：函数计算使用 SQLite，每次冷启动可能会重新初始化
2. **免费额度**：每月 100万次调用足够个人使用
3. **性能**：冷启动可能需要 1-3 秒

---

## 📞 需要帮助？

如果遇到问题，可以参考官方文档：
- 函数计算：https://help.aliyun.com/product/50980.html
- OSS：https://help.aliyun.com/product/31815.html
