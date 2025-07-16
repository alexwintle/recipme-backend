import { ObjectId } from "mongodb";
import { accessCollection } from "../config/mongoClient"
import { User } from "../model/User";

const usersCollection = await accessCollection<User>(process.env.USER_COLLECTION_NAME ?? "users")

export const saveUser = async (newUser: User): Promise<ObjectId> => {
  const result = await usersCollection.insertOne(newUser)

  return result.insertedId
}

export const findUserByUid = async (uid: string): Promise<User | null> => {
  return await usersCollection.findOne({ uid });
}