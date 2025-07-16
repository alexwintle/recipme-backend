import { Collection } from "mongodb";
import { accessCollection } from "../../../config/mongoClient";
import { User } from "../../../model/User";
import { findUserByUid, saveUser } from "../../../repository/usersRepository";
import { startTestDatabase, stopTestDatabase } from "../../utils/testDatabase"

describe('usersRepository', () => {
  let usersCollection: Collection<User>;

  beforeAll(async () => {
    await startTestDatabase();
    usersCollection = await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users");
  });

  afterAll(async () => {
    await stopTestDatabase();
  })

  test('Should save a user to the users repository', async () => {
    const newUser: User = {
      username: 'johnsmith',
      uid: 'abc123',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const insertedId = await saveUser(newUser);
    expect(insertedId).toBeDefined();

    const foundUser = await usersCollection.findOne({ uid: newUser.uid })

    expect(foundUser).not.toBeNull();
    expect(foundUser?.uid).toBe(newUser.uid);
    expect(foundUser?.username).toBe(newUser.username);
  })

  test('Should find a saved user in the users repository', async () => {
    const savedUser: User = {
      username: 'johnsmith',
      uid: 'abc123',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await usersCollection.insertOne(savedUser);

    const foundUser = await findUserByUid(savedUser.uid);

    expect(foundUser).not.toBeNull();
    expect(foundUser?.username).toBe(savedUser.username);
    expect(foundUser?.uid).toBe(savedUser.uid);
    expect(foundUser?.status).toBe(savedUser.status);
  })
});