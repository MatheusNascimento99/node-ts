export interface User{
    name: string,
    email: string
}

const db = [{ 
    name: "Joana", 
    email: "joana@teste.com" 
}];

export class UserService{
    db:User []

    constructor( database = db){
        this.db = database
    }

    createUser = (name:string, email:string) => {

        const user = {
            name, 
            email
        }
        this.db.push(user)
        console.log(this.db)
    }

    getAllUsers = () =>{
        return this.db
    }
}