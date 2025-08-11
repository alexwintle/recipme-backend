import { Request, Response } from "express";
import { createUser } from "../services/usersService";
import { NewUserRequest } from "../types/NewUserRequest";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Request body not provided.",
      });
    }
    
    const newUserRequest: NewUserRequest = req.body;

    const requiredFields = ["uid", "username"];

    const missingField = requiredFields.find((field) => !req.body[field]);

    if (missingField) {
      return res.status(400).json({
        error: `${missingField} was not provided.`,
      });
    }

    const createdUserUID = await createUser(newUserRequest);

    return res.status(200).json({
      createdUser: createdUserUID,
      message: `Created user with UID: ${createdUserUID}`,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json({
      error: String(error),
    });
  }
};