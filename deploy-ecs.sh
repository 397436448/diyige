#! /bin/bash

# ==========================================
# 阿里云轻量应用服务器一键部署脚本
# 使用说明：
# 1. 购买阿里云轻量应用服务器（选择 Ubuntu 22.04
# 2. 配置安全组开放 80, 443, 3001, 3000 端口
# 3. 上传代码到服务器
# 4. 运行此脚本
# ==========================================

set -e

echo "🚀 开始部署 AI 提示词生成器..."

# 更新系统
echo "📦 更新系统包..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 安装 Node.js 和 npm
echo "🟢 安装 Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
echo "⚙️  安装 PM2 (进程管理器)..."
sudo npm install -g pm2

# 安装 Nginx
echo "🌐 安装 Nginx..."
sudo apt-get install -y nginx

# 进入项目目录
cd /root/ai-prompt-generator || { echo "❌ 请先上传代码到 /root/ai-prompt-generator 目录"; exit 1; }

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
npm install
npm run prisma:generate
npm run build

# 初始化数据库
echo "🗄️  初始化数据库..."
npm run prisma:push

# 安装前端依赖
echo "📦 安装前端依赖..."
cd ../frontend
npm install
npm run build

# 启动后端服务
echo "🚀 启动后端服务..."
cd ../backend
pm2 start dist/index.js --name ai-prompt-api

# 配置 Nginx
echo "⚙️  配置 Nginx..."
sudo rm -f /etc/nginx/sites-available/default
sudo rm -f /etc/nginx/sites-enabled/default

# 创建 Nginx 配置
sudo tee /etc/nginx/sites-available/ai-prompt-generator > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    # 前端
    location / {
        root /root/ai-prompt-generator/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        index index.html;
    }

    # 后端 API 代理
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/ai-prompt-generator /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# 保存 PM2 配置
pm2 save
pm2 startup

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址：http://您的服务器IP"
echo "🔧 管理命令："
echo "   - 查看服务状态：pm2 status"
echo "   - 查看后端日志：pm2 logs ai-prompt-api"
echo "   - 重启后端：pm2 restart ai-prompt-api"
echo ""
echo "📋 下一步："
echo "   1. 注册一个账户"
echo "   2. 修改数据库，将账户角色改为 ADMIN"
echo "   3. 配置域名（可选）"
echo "   4. 配置 HTTPS（推荐）"
