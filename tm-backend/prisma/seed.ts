import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import {
  PriorityLevel,
  RoleName,
  TaskStatus,
} from '../src/generated/prisma/enums.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to run the seed');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const seedUsers = [
  {
    email: 'admin@taskmanager.local',
    password: '123456',
    name: 'Task Manager Admin',
    role: RoleName.ADMIN,
  },
  {
    email: 'user@taskmanager.local',
    password: '123456',
    name: 'Task Manager User',
    role: RoleName.USER,
  },
] as const;

async function main() {
  const users = new Map<string, { id: string }>();

  for (const seedUser of seedUsers) {
    const user = await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {
        name: seedUser.name,
        role: seedUser.role,
        password: await bcrypt.hash(seedUser.password, 10),
      },
      create: {
        email: seedUser.email,
        name: seedUser.name,
        role: seedUser.role,
        password: await bcrypt.hash(seedUser.password, 10),
      },
      select: { id: true },
    });

    users.set(seedUser.email, user);
  }

  const admin = users.get('admin@taskmanager.local');
  const user = users.get('user@taskmanager.local');

  if (!admin || !user) {
    throw new Error('Seed users were not created');
  }

  const taskTitles = [
    'Review project requirements',
    'Implement authentication flow',
    'Write API tests',
  ];

  await prisma.task.deleteMany({
    where: {
      title: { in: taskTitles },
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: taskTitles[0],
        description:
          'Review the task manager requirements and plan the next steps.',
        status: TaskStatus.IN_PROGRESS,
        priority: PriorityLevel.HIGH,
        userId: admin.id,
      },
      {
        title: taskTitles[1],
        description:
          'Implement register and login flow with JWT authentication.',
        status: TaskStatus.TODO,
        priority: PriorityLevel.HIGH,
        userId: user.id,
      },
      {
        title: taskTitles[2],
        description: 'Add unit tests for the main controllers and services.',
        status: TaskStatus.TODO,
        priority: PriorityLevel.MEDIUM,
        userId: user.id,
      },
    ],
  });

  console.log('Seed completed successfully');
  console.log('Admin: admin@taskmanager.local / Admin123!');
  console.log('User: user@taskmanager.local / User123!');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
