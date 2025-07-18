import { Request, Response } from "express";
import { createUser } from "../../../services/usersService";
import { createUserHandler } from "../../../controller/usersController";

jest.mock("../../../services/usersService")

describe('Users Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Should consume user and return created user', async () => {
    const newUser = {
      username: 'johnsmith',
      uid: 'abc123',
    };

    const mockReq = {
      body: newUser
    } as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    } as Partial<Response>;

    (createUser as jest.Mock).mockResolvedValue('abc123');

    await createUserHandler(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      createdUser: newUser.uid,
      message: "Created user with UID: abc123",
    })

  });

});
