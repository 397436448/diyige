# 📦 AI提示词生成器 - 完整打包指南

## 🎯 方案一：快速本地运行（推荐新手）

不需要打包成EXE，直接双击运行！

### 使用方法

1. **确保已安装Node.js**
   - 下载地址：https://nodejs.org/
   - 选择LTS版本，安装时勾选"Add to PATH"

2. **运行启动脚本**
   - 双击 `启动AI提示词生成器.bat`
   - 脚本会自动安装依赖并启动

3. **开始使用**
   - 浏览器会自动打开 http://localhost:5173

---

## 📦 方案二：打包成EXE（需要在你电脑上操作）

由于网络限制，需要你在自己的电脑上完成打包：

### 第一步：准备环境

1. **安装Node.js 20.x LTS**
   - 下载：https://nodejs.org/
   - 选择 LTS 版本（推荐）

2. **下载或克隆项目代码**
   - 确保你有完整的项目文件

### 第二步：在项目目录打开终端

1. 在项目文件夹空白处，按住 `Shift` + 右键
2. 选择"在此处打开PowerShell窗口"或"在终端打开"

### 第三步：设置npm镜像（加速下载）

在终端输入：
```bash
# 创建.npmrc文件
notepad .npmrc
```

在打开的记事本中粘贴以下内容并保存：
```
registry=https://registry.npmmirror.com
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

### 第四步：安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd frontend
npm install
cd ..

# 安装后端依赖
cd backend
npm install
cd ..
```

### 第五步：准备图标

1. 找一个256x256像素的PNG图片作为图标
2. 保存为：`electron/assets/icon.png`
3. （可选）可以使用项目里的`electron/assets/icon.svg`在线转换为PNG

### 第六步：构建前端

```bash
cd frontend
npm run build
cd ..
```

### 第七步：打包EXE

```bash
npm run build:win
```

等待几分钟，打包完成后，EXE文件会在 `dist-exe/` 目录下！

---

## 📋 项目文件说明

```
ai-prompt-generator/
├── 启动AI提示词生成器.bat  ← 双击直接运行（推荐）
├── README-ELECTRON.md       ← Electron打包详细说明
├── README-打包指南.md       ← 本文档
├── package.json             ← 项目配置
├── electron/                ← Electron相关文件
│   ├── main.js
│   ├── preload.js
│   └── assets/
│       ├── icon.svg         ← 图标SVG版本
│       └── icon.png         ← 需要你准备PNG图标
├── backend/                 ← 后端API
└── frontend/                ← 前端界面
```

---

## 🆘 常见问题

### Q: 双击bat脚本没反应？
A: 确保你已经安装了Node.js！

### Q: npm install太慢？
A: 按照上面"第三步"配置镜像源

### Q: 打包失败提示缺少图标？
A: 请确保 `electron/assets/icon.png` 文件存在

### Q: 如何打包成EXE？
A: 你需要在你自己的电脑上操作，按照"方案二"的步骤

---

## 💡 推荐方案

对于日常使用，**方案一（双击bat文件）** 就足够了！

需要分享给别人时，再使用**方案二（EXE打包）**。

---

## 🎉 开始使用吧！

1. 先试试双击 `启动AI提示词生成器.bat`
2. 有问题随时查看本文档
