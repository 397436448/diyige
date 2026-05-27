import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';

async function testLogin() {
  try {
    const adminEmail = 'admin@example.com';
    const testPassword = 'admin123';

    console.log('🔍 正在查找用户...');
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user) {
      console.error('❌ 用户不存在');
      process.exit(1);
    }

    console.log('✅ 用户找到:', user.email);
    console.log('👤 用户名:', user.username);
    console.log('🔑 角色:', user.role);

    console.log('\n🔐 验证密码...');
    const passwordValid = await bcrypt.compare(testPassword, user.passwordHash);

    if (passwordValid) {
      console.log('✅ 密码验证成功！');
    } else {
      console.error('❌ 密码验证失败');
      console.log('原始密码:', testPassword);
      console.log('哈希:', user.passwordHash);
    }

    process.exit(0);
  } catch (error) {
    console.error('测试失败:', error);
    process.exit(1);
  }
}

testLogin();