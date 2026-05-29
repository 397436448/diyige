const fs = require('fs');
const path = require('path');

const svgIcon = `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" fill="url(#grad1)" rx="48"/>
  <text x="50%" y="50%" font-size="120" text-anchor="middle" dominant-baseline="middle" fill="white">✨</text>
</svg>`;

const iconPath = path.join(__dirname, 'electron/assets/icon.png');
console.log('⚠️ 注意: 本脚本需要安装 sharp 或 canvas 库才能生成PNG图标');
console.log('   为了演示，这里只保存SVG文件');

const svgPath = path.join(__dirname, 'electron/assets/icon.svg');
fs.writeFileSync(svgPath, svgIcon);
console.log(`✅ SVG图标已保存到: ${svgPath}`);
console.log('   请使用在线工具将其转换为PNG图标，或替换为你自己的PNG图标');
