import { DataSource, EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRespository {
    private manager: EntityManager

    constructor(
        manager : EntityManager
    ){
        this.manager = manager;
    }

    createUser = async(user:User): Promise <User> =>{
        return this.manager.save(user)
    }

    geteUser = async(userId:string): Promise <User | null> =>{
        return this.manager.findOne(User, {
            where:{
                user_id: userId
            }
        })
    }

     
    getUserByEmailAndPassworl = async (email:string, password:string): Promise <User | null> =>{
        return this.manager.findOne(User, {
            where: {
                email,
                password
            }
        })
    }

}