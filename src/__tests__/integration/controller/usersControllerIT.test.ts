import request from 'supertest';
import { clearDatabase, startTestDatabase, stopTestDatabase } from '../../utils/testDatabase';
import { NewUserRequest } from '../../../types/NewUserRequest';
import { User, UserStatus } from '../../../model/User';
import { accessCollection } from '../../../config/mongoClient';
import { Collection } from 'mongodb';
import { createApp } from '../../../app';
import { App } from 'supertest/types';

describe('POST /users (integration)', () => {
  let usersCollection: Collection<User>;
  let app: App;

  beforeAll(async () => {
    await startTestDatabase();
    app = createApp();
    usersCollection = await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users");
  });

  beforeEach(async () => {
    await clearDatabase(usersCollection);
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  test('Should create and return a new user', async () => {
    const newUser: NewUserRequest = {
      username: 'johnsmith',
      uid: 'abc123',
    };

    const res = await request(app)
      .post('/users/create/user')
      .send(newUser)
      .expect(200);

    const expectedUser: User = {
      username: 'johnsmith',
      uid: 'abc123',
      status: UserStatus.ACTIVE,
      createdAt: new Date().toISOString()
    }

    expect(newUser.uid).toBe(expectedUser.uid);
    expect(res.body).toMatchObject({
      createdUser: newUser.uid,
      message: "Created user with UID: abc123",
    });
  }, 30000);

});
