import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRespository } from "./User.Respository"

describe('UserRepositort', () => {
    let userRepository: UserRespository
    let  managerMock: Partial<EntityManager>

    const mockUser:User = {
        user_id: '1',
        name: 'Matheus',
        email: 'teste@.com',
        password: 'password',

    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            saveReturn:mockUser
        })
        userRepository = new UserRespository(managerMock as EntityManager)
    })

    it('Deve cadastrar um novo usuáros no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})
