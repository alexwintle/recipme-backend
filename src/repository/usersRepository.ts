import { ObjectId } from "mongodb";
import { accessCollection } from "../config/mongoClient"
import { User } from "../model/User";

const getUsersCollection = async () => {
  return await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users");
};

export const saveUser = async (newUser: User): Promise<ObjectId> => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.insertOne(newUser);

  return result.insertedId;
}

export const findUserByUid = async (uid: string): Promise<User | null> => {
  const usersCollection = await getUsersCollection();

  return await usersCollection.findOne({ uid });
}