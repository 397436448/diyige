import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';

async function initAdmin() {
  try {
    const adminEmail = 'admin@example.com';
    const adminUsername = 'admin';
    const adminPassword = 'admin123'; // 生产环境请修改为强密码

    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: adminEmail },
          { username: adminUsername }
        ]
      }
    });

    if (existingAdmin) {
      console.log('管理员账户已存在');
      console.log('邮箱:', adminEmail);
      console.log('用户名:', adminUsername);
      console.log('密码:', adminPassword);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        username: adminUsername,
        passwordHash,
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('✅ 管理员账户创建成功！');
    console.log('------------------------');
    console.log('📧 邮箱:', adminEmail);
    console.log('👤 用户名:', adminUsername);
    console.log('🔑 密码:', adminPassword);
    console.log('------------------------');
    console.log('⚠️  请务必修改默认密码！');

    process.exit(0);
  } catch (error) {
    console.error('创建管理员账户失败:', error);
    process.exit(1);
  }
}

initAdmin();