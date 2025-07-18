import { User, UserStatus } from "../model/User";
import { saveUser } from "../repository/usersRepository"
import { NewUserRequest } from "../types/NewUserRequest";

export const createUser = async (newUser: NewUserRequest) => {
  const formatUser: User = {
    uid: newUser.uid,
    username: newUser.username,
    status: UserStatus.ACTIVE,
    createdAt: new Date().toISOString(),
  };

  return saveUser(formatUser)
}