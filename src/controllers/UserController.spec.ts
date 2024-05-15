import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";


const mockUserService = {
  createUser: jest.fn()

}
jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(()=>{
      return mockUserService
    })
  }
})

describe("UserController", () => {
  
  const userController = new UserController();

  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "João MIglatiio",
        email: "Testando@teste.com",
      },
    } as Request;
    const MockResponse = makeMockResponse();
    userController.createUser(mockRequest, MockResponse);
    expect(MockResponse.state.status).toBe(201);
    expect(MockResponse.state.json).toMatchObject({
      menssage: "Usuário criado!",
    });
  });

});
