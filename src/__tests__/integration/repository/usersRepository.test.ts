import { User } from "../../../model/User";
import { findUserByUid, saveUser } from "../../../repository/usersRepository";
import { startTestDatabase, stopTestDatabase } from "../../utils/testDatabase"

describe('usersRepository', () => {
  beforeAll(async () => {
    await startTestDatabase();
  });

  afterAll(async () => {
    await stopTestDatabase();
  })

  test('Should save a user to the users repository', async () => {
    const mockUser: User = {
      username: 'johnsmith',
      uid: 'abc123',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const insertedId = await saveUser(mockUser);
    expect(insertedId).toBeDefined();

    const foundUser = await findUserByUid(mockUser.uid);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.uid).toBe(mockUser.uid);
    expect(foundUser?.username).toBe(mockUser.username);

  })
})