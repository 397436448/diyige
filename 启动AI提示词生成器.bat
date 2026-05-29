@echo off
chcp 65001 >nul
title AI提示词生成器 - 启动器

echo ========================================
echo     AI提示词生成器 - 桌面启动器
echo ========================================
echo.

REM 检查Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未检测到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js已安装
node -v

REM 检查项目目录
if not exist "backend\package.json" (
    echo [错误] 未找到项目文件，请在项目根目录运行
    pause
    exit /b 1
)

REM 启动后端（后台运行）
echo.
echo [1/3] 正在启动后端...
cd backend
if not exist "node_modules" (
    echo 首次运行，正在安装后端依赖...
    call npm install
    call npm run prisma:push
)
start "AI提示词生成器-后端" cmd /k "npm run dev"
timeout /t 3 >nul
cd ..

REM 启动前端（后台运行）
echo.
echo [2/3] 正在启动前端...
cd frontend
if not exist "node_modules" (
    echo 首次运行，正在安装前端依赖...
    call npm install
)
start "AI提示词生成器-前端" cmd /k "npm run dev"
timeout /t 5 >nul
cd ..

REM 打开浏览器
echo.
echo [3/3] 正在打开浏览器...
timeout /t 2 >nul
start http://localhost:5173

echo.
echo ========================================
echo     启动完成！
echo.
echo     前端地址：http://localhost:5173
echo     后端地址：http://localhost:3001
echo.
echo     注意：请不要关闭这两个黑色窗口
echo ========================================
echo.
echo 按任意键退出（不会关闭服务）
pause >nul
