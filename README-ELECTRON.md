# 📦 AI提示词生成器 - 桌面版打包指南

## 🚀 快速开始

### 第一步：安装依赖

```bash
# 1. 安装项目根目录的Electron依赖
npm install

# 2. 安装前端依赖
cd frontend
npm install

# 3. 安装后端依赖
cd ../backend
npm install
```

### 第二步：准备图标

在打包前，请准备一个PNG格式的应用图标（建议尺寸256x256像素），并保存为：
`electron/assets/icon.png`

目前已经有一个SVG版本：`electron/assets/icon.svg`
你可以使用在线工具（如 https://convertio.co/zh/svg-png/）将其转换为PNG格式。

### 第三步：构建前端

```bash
cd frontend
npm run build
```

### 第四步：打包成EXE

```bash
# 返回到项目根目录
cd ..

# 打包成Windows EXE安装程序
npm run build:win
```

打包完成后，EXE文件会在 `dist-exe/` 目录下。

---

## 📁 项目结构

```
/workspace/
├── backend/              # 后端API
├── frontend/             # 前端界面
├── electron/
│   ├── main.js          # Electron主进程
│   ├── preload.js       # 预加载脚本
│   └── assets/
│       ├── icon.svg     # SVG图标
│       └── icon.png     # PNG图标（需要准备）
├── package.json         # Electron打包配置
└── README-ELECTRON.md  # 本文档
```

---

## 🎯 使用说明

### 开发模式（需要后端运行）

```bash
# 在一个终端运行后端
cd backend
npm install
npm run prisma:push
npm run dev

# 在另一个终端运行Electron开发模式
cd ..
npm run dev
```

### 生产模式（仅前端）

注意：这个打包方案目前只包含前端界面。要完整使用，你有两个选择：

**方案一：使用云部署的后端**
1. 先把后端部署到云端（如阿里云、Vercel等）
2. 修改 `frontend/src/services/api.ts` 中的API地址
3. 重新构建并打包

**方案二：本地同时运行前端和后端**
1. 创建一个启动脚本同时启动前端和后端
2. 或者把后端也打包进Electron

---

## 📝 配置说明

### 修改应用名称和版本

编辑根目录的 `package.json`：
```json
{
  "name": "ai-prompt-generator",
  "version": "1.0.0",
  "productName": "AI提示词生成器"
}
```

### 修改应用图标

替换 `electron/assets/icon.png` 为你自己的图标（建议256x256像素PNG格式）

---

## 🆘 常见问题

**Q: 打包失败，提示找不到图标？**
A: 请确保 `electron/assets/icon.png` 文件存在！

**Q: 打包后打开是空白？**
A: 请确保前端已经构建过：`cd frontend && npm run build`

**Q: 如何同时打包后端？**
A: 这需要更多配置，建议先用方案一（云后端）测试

---

## ✨ 下一步

打包成功后：
1. 将 `dist-exe/` 目录下的EXE文件复制到桌面
2. 双击安装
3. 开始使用！

有问题随时查看本文档！
