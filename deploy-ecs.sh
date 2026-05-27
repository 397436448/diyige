#! /bin/bash

echo "🚀 开始部署 AI 提示词生成器..."

# 更新系统
echo "📦 更新系统包..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 安装 Node.js 18
echo "🟢 安装 Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
echo "⚙️ 安装 PM2..."
sudo npm install -g pm2

# 安装 Nginx
echo "🌐 安装 Nginx..."
sudo apt-get install -y nginx

# 安装 Git（如果没有的话）
echo "📥 安装 Git..."
sudo apt-get install -y git

# 克隆代码
echo "📦 克隆代码..."
git clone https://github.com/397436448/diyige.git /root/ai-prompt-generator
cd /root/ai-prompt-generator

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
npm install
npm run prisma:generate
npm run build

# 初始化数据库
echo "🗄️ 初始化数据库..."
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
echo "⚙️ 配置 Nginx..."
sudo rm -f /etc/nginx/sites-available/default
sudo rm -f /etc/nginx/sites-enabled/default

sudo tee /etc/nginx/sites-available/ai-prompt-generator > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        root /root/ai-prompt-generator/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        index index.html;
    }

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

sudo ln -sf /etc/nginx/sites-available/ai-prompt-generator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

pm2 save
pm2 startup

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址：http://你的服务器IP"
echo "🔧 管理命令："
echo "   - 查看服务状态：pm2 status"
echo "   - 查看日志：pm2 logs ai-prompt-api"
echo "   - 重启后端：pm2 restart ai-prompt-api"
