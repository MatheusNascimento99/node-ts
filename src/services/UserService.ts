import { Subject } from "typeorm/persistence/Subject";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRespository } from "../repositores/User.Respository"
import { sign } from "jsonwebtoken";


export class UserService{
    private userRepository: UserRespository;
    constructor(
        userRepository = new UserRespository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }

    createUser = async (name:string, email:string, password:string): Promise<User> => {
        const user = new User(name, email, password)
        return this.userRepository.createUser(user)
    }

   

    getUser = async(userId:string): Promise <User | null> =>{
        return this.userRepository.geteUser(userId)
    }

    getAuthenticatedUser = async (email:string, password:string): Promise <User | null> => {
        return this.userRepository.getUserByEmailAndPassworl(email, password)
    }

    getToken = async (email:string, password:string): Promise<string> =>{
        const user = await this.getAuthenticatedUser(email, password)
        if(!user){
            throw new Error('Email ou senha inválidos!')
        }

        const tokenData = {
            name:user?.name,
            email:user?.email
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.user_id
        }

        const token = sign(tokenData, tokenKey,tokenOptions )

        return token
    }


   /*  deleteUsers = (id:number) => {
        this.db.pop()
        console.log(this.db)
    } */
}