// Тестовые данные для проверки
export const testUser = {
  _id: '1',
  username: 'testuser',
  email: 'test@taskflow.com',
  role: 'USER',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const testProject = {
  _id: '1',
  title: 'Test Project',
  description: 'Test project description',
  status: 'ACTIVE',
  lead: testUser,
  members: [testUser],
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const testTask = {
  _id: '1',
  title: 'Test Task',
  description: 'Test task description',
  status: 'TODO',
  priority: 'MEDIUM',
  project: testProject,
  assignee: testUser,
  tags: [],
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date()
};