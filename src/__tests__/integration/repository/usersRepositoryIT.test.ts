import { Collection } from "mongodb";
import { accessCollection } from "../../../config/mongoClient";
import { User, UserStatus } from "../../../model/User";
import { findUserByUid, saveUser } from "../../../repository/usersRepository";
import * as collection from '../../../config/mongoClient';
import { clearDatabase, startTestDatabase, stopTestDatabase } from "../../utils/testDatabase"
import { NewUserRequest } from "../../../types/NewUserRequest";

describe('usersRepository', () => {
  let usersCollection: Collection<User>;

  beforeAll(async () => {
    await startTestDatabase();
    usersCollection = await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users");
  });

  beforeEach(async () => {
    await clearDatabase(usersCollection);
  });

  afterAll(async () => {
    await stopTestDatabase();
  })

  describe(('Should succeed:'), () => {
    test('Should save a user to the users repository', async () => {
      const newUser: User = {
        username: 'johnsmith',
        uid: 'abc123',
        status: UserStatus.ACTIVE,
        createdAt: new Date().toISOString(),
      };

      const insertedId = await saveUser(newUser);
      expect(insertedId).toBeDefined();

      const foundUser = await usersCollection.findOne({ uid: newUser.uid })

      expect(foundUser).not.toBeNull();
      expect(foundUser?.uid).toBe(newUser.uid);
      expect(foundUser?.username).toBe(newUser.username);
      expect(foundUser?.status).toBe(UserStatus.ACTIVE);
      expect(foundUser?.createdAt).toBeDefined();
    });

    test('Should find a saved user in the users repository', async () => {
      const savedUser: User = {
        username: 'johnsmith',
        uid: 'abc123',
        status: UserStatus.ACTIVE,
        createdAt: new Date().toISOString(),
      };

      await usersCollection.insertOne(savedUser);

      const foundUser = await findUserByUid(savedUser.uid);

      expect(foundUser).not.toBeNull();
      expect(foundUser?.username).toBe(savedUser.username);
      expect(foundUser?.uid).toBe(savedUser.uid);
      expect(foundUser?.status).toBe(savedUser.status);
    });

  })

  describe('Should fail:', () => {
    test('Should throw an error when trying to save a user with a duplicate UID', async () => {
      const newUser: User = {
        username: 'johnsmith',
        uid: 'abc123',
        status: UserStatus.ACTIVE,
        createdAt: new Date().toISOString(),
      };

      //First insert - no duplicates yet
      await saveUser(newUser);

      await expect(saveUser(newUser)).rejects.toThrow('User with UID "abc123" already exists');
    });

    test('Should throw an error when trying to find a user who is not in the database', async () => {
      const newUser: User = {
        username: 'johnsmith',
        uid: 'abc123',
        status: UserStatus.ACTIVE,
        createdAt: new Date().toISOString(),
      };

      await expect(findUserByUid(newUser.uid)).rejects.toThrow("User not found in the database");
    });

    test('Should throw a database error when MongoDB fails', async () => {
      jest.spyOn(collection, 'accessCollection').mockImplementationOnce(() => {
        return Promise.resolve({
          findOne: () => { throw new Error('Mongo connection error'); }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      });

      await expect(findUserByUid('any-uid')).rejects.toThrow("Database error occurred while finding user");
    });
  });

});