const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
//   console.log(hashedPassword)
  await prisma.user.create({
    data: {
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log("Admin created successfully")
}

createAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});
