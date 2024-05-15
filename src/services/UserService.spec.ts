import {UserService } from "./UserService";
import * as jwt from 'jsonwebtoken'

jest.mock("../repositores/User.Respository")
jest.mock('../database',() => {
    intialize:jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require("../repositores/User.Respository")

describe("UserService", () => {
  const userService = new UserService(mockUserRepository)
  const mockUser = {
    user_id:"1",
    name:"Matheus",
    email:"teste@teste.com",
    password:"12345"
  }

  it("Deve adicionar um novo usuário", async () => {

    mockUserRepository.createUser = jest.fn().mockImplementation(() => 
      Promise.resolve(mockUser)
    )
    const response = await userService.createUser('Matheus','teste@teste.com', '12345');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      user_id:"1",
      name:"Matheus",
      email:"teste@teste.com",
      password:"12345"
    })
  });


  it('Devo retornar um token de usuário', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    const token = await userService.getToken('teste@teste.com', '123456')
    expect(token).toBe('token')
  })
});
