import express, { Request, Response, response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = new UserService();
  }

  createUser = (request: Request, response: Response) => {
    const user = request.body;

    if (!user.name || !user.email || !user.password) {
      return response
        .status(400)
        .json({ message: "Bad Request. Todos os campos são obrigatórios" });
    }

    this.userService.createUser(user.name, user.email, user.password);
    return response.status(201).json({ menssage: "Usuário criado!" });
  };

  getUser = async (request: Request, response: Response) => {
    const { userId } = request.params
    const user =  await this.userService.getUser(userId)
    return response.status(200).json( {
      userId:user?.user_id,
      name: user?.name,
      email: user?.email

    } )
  };

 /*  deleteUsers = (request: Request, response: Response) => {
    const users = this.userService.getUser();
    return response.status(200).json(users);
  }; */
}

