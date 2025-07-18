import { MongoError } from "mongodb";
import { accessCollection } from "../config/mongoClient"
import { User } from "../model/User";

const getUsersCollection = async () => {
  return await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users");
};

export const saveUser = async (newUser: User): Promise<string> => {
  try {
    const usersCollection = await getUsersCollection();

    await usersCollection.insertOne(newUser);

    return newUser.uid;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new Error(`User with UID "${newUser.uid}" already exists`);
    } else {
      throw error
    }
  }
};

export const findUserByUid = async (uid: string): Promise<User> => {
  const usersCollection = await getUsersCollection();

  let user: User | null;
  
  try {
    user = await usersCollection.findOne({ uid });
  } catch (error) {
    console.error(`Failed to find user with uid ${uid}`, error);
    throw new Error("Database error occurred while finding user");
  }

  if (!user) {
    throw new Error("User not found in the database");
  }

  return user;
}

