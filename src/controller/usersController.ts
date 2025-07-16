import { Request, Response } from "express"
import { createUser } from "../services/usersService";

export const createUserHandler = (req: Request, res: Response) => {
  const newUser = req.body

  res.json(createUser(newUser))
}