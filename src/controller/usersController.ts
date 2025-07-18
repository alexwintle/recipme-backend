import { Request, Response } from "express";
import { createUser } from "../services/usersService";
import { NewUserRequest } from "../types/NewUserRequest";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const newUser: NewUserRequest = req.body;
    const createdUserUID = await createUser(newUser);

    res
      .status(200)
      .json({
        createdUser: createdUserUID,
        message: "Created user with UID: " + createdUserUID,
      });

  } catch (error) {
    console.error("Failed to create user:", error);
  }
};