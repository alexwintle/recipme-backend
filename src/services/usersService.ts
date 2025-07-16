import { User } from "../model/User"
import { findUserByUid, saveUser } from "../repository/usersRepository"

export const createUser = async (newUser: User) => {
  const existingUser = await findUserByUid(newUser.uid);

  if (existingUser) {
    throw new Error('User already exists')
  }

  return saveUser(newUser)
}