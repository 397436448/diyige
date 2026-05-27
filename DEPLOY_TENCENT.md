# 🚀 腾讯云部署指南（免费方案）

## 📋 目录
- [准备工作](#准备工作)
- [部署后端（云函数 SCF）](#部署后端云函数-scf)
- [部署前端（对象存储 COS）](#部署前端对象存储-cos)
- [常见问题](#常见问题)

---

## 准备工作

### 1. 注册腾讯云账号
- 访问：https://cloud.tencent.com
- 完成实名认证（个人认证即可）

### 2. 开通必要服务
- **云函数 SCF**：https://cloud.tencent.com/product/scf
- **对象存储 COS**：https://cloud.tencent.com/product/cos

---

## 部署后端（云函数 SCF）

### 第一步：创建函数

1. 进入 [云函数控制台](https://console.cloud.tencent.com/scf)
2. 选择地域（推荐：广州、上海或北京）
3. 点击 **"新建"**
4. 选择 **"从头开始"**
5. 配置函数：
   ```
   函数名称：ai-prompt-api
   运行环境：Nodejs 18.0
   创建方式：自定义创建
   ```

### 第二步：配置函数

在函数配置页面：

1. **执行方法**：
   - 输入：`index.main_handler`
   - （稍后我们创建入口文件）

2. **环境变量**：
   ```
   NODE_ENV = production
   PORT = 9000
   DATABASE_URL = /tmp/prod.db
   JWT_SECRET = your-secure-secret-key-change-this
   CORS_ORIGIN = *
   ```

3. **内存**：256 MB（够用）

4. **超时时间**：30 秒

### 第三步：创建入口文件

在 `/workspace/backend/src/` 创建 `scf-handler.ts`：

```typescript
exports.main_handler = async (event: any, context: any) => {
  // 导入 Express 应用
  const app = require('../dist/index.js').app;
  
  // 处理请求
  return new Promise((resolve, reject) => {
    app(event, null, (result: any) => {
      resolve(result);
    });
  });
};
```

### 第四步：打包并上传代码

1. **本地打包**：
   ```bash
   cd /workspace/backend
   npm install
   npm run build
   
   # 创建部署包（只包含必要文件）
   mkdir -p deploy/dist
   cp -r dist/ node_modules/ package.json package-lock.json deploy/
   cd deploy
   zip -r scf.zip .
   ```

2. **上传到云函数**：
   - 在云函数页面点击 **"上传部署包"**
   - 选择刚才创建的 `scf.zip`

### 第五步：配置触发器

1. 在函数页面点击 **"触发管理"**
2. 点击 **"创建触发器"**
3. 选择触发器类型：**API 网关触发器**
4. 配置：
   - 集成响应：✅ 启用
   - 可访问域名前缀：ai-prompt-api
5. 点击 **"提交"**

6. **获取 API 地址**：
   - 在触发器列表中找到 API 网关 URL
   - 类似：`https://service-xxxxx.gz.apigw.tencentcs.com/release/ai-prompt-api`

---

## 部署前端（对象存储 COS）

### 第一步：创建 Bucket

1. 进入 [COS 控制台](https://console.cloud.tencent.com/cos)
2. 点击 **"创建 Bucket"**
3. 配置：
   ```
   名称：ai-prompt-frontend-你的appid（必须唯一）
   地域：选择离你近的地域
   访问权限：公有读私有写
   ```

### 第二步：上传前端文件

1. **构建前端**：
   ```bash
   cd /workspace/frontend
   npm install
   npm run build
   ```

2. **上传文件**：
   - 在 COS 控制台进入你的 Bucket
   - 点击 **"上传文件"**
   - 上传 `dist` 目录下的**所有文件和文件夹**

### 第三步：配置静态网站托管

1. 在 Bucket 设置中找到 **"静态网站设置"**
2. 点击 **"编辑"**
3. 开启静态网站：
   ```
   静态网站状态：开启
   索引页面：index.html
   错误页面：index.html
   ```

4. **获取访问地址**：
   - Bucket 概览中找到 **"静态网站访问地址"**
   - 类似：`https://ai-prompt-frontend-xxx.cos-website.ap-guangzhou.myqcloud.com`

### 第四步：配置 CDN 加速（推荐）

1. 进入 [CDN 控制台](https://console.cloud.tencent.com/cdn)
2. 点击 **"添加域名"**
3. 配置加速域名：
   ```
   加速域名：your-domain.com（可选）
   源站类型：COS 桶
   源站地址：选择你的 COS Bucket
   ```
4. 配置完成后再配置 DNS

---

## 配置前端 API 地址

### 修改前端环境变量

在 `/workspace/frontend/` 创建 `.env.production`：

```
VITE_API_URL=https://service-xxxxx.gz.apigw.tencentcs.com/release/ai-prompt-api
```

### 重新构建并上传

```bash
cd /workspace/frontend
npm run build

# 上传 dist 目录到 COS
```

---

## 测试部署

### 测试后端 API
```bash
curl https://service-xxxxx.gz.apigw.tencentcs.com/release/ai-prompt-api/api/health
```

### 访问前端
打开浏览器访问你的 COS 静态网站地址。

---

## 常见问题

### Q1: 云函数冷启动慢？
A: 腾讯云有免费预置并发额度，可以配置保持最小实例数。

### Q2: 数据库每次重启会丢失数据？
A: 是的，函数计算是无状态的。可以：
- 升级到付费版使用持久化存储
- 或使用腾讯云 PostgreSQL/MySQL 数据库（有免费额度）

### Q3: 免费额度用完怎么办？
A: 按量计费，价格很低。个人项目一般不会超过免费额度。

### Q4: 如何查看日志？
A: 在云函数控制台点击 **"日志查询"** 即可查看。

---

## 🎉 完成！

部署完成后，你会拥有：
- **前端地址**：COS 静态网站访问地址
- **后端地址**：API 网关地址
- **管理后台**：`/admin` 路径

---

## 📞 需要帮助？

- 云函数文档：https://cloud.tencent.com/document/product/583
- COS 文档：https://cloud.tencent.com/document/product/436
