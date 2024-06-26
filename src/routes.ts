import { Router }   from 'express'
import { UserController } from "./controllers/UserController";
import { LoginController } from './controllers/LoginControler';
import { verifyAuth } from './midleware/verifyAuth';

export const router  = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post("/user", userController.createUser );
router.get("/user/:userId", verifyAuth, userController.getUser );

router.post("/login", loginController.login );
/* router.delete("/user", userController.deleteUser ); */
