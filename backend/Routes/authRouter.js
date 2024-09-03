import {Router} from 'express'
import  { signup, login, getAllUser,updateUser,deleteUser} from '../Controllers/authController.js'
import  { signupValidation, loginValidation } from '../Middlewares/authValidation.js'
import ensureAuthenticated  from '../Middlewares/auth.js'

const userRouter = Router();

userRouter.post('/login', loginValidation, login);
userRouter.post('/signup', signupValidation, signup);
userRouter.get('/get-all-user',getAllUser)
userRouter.post('/update-user/:id',updateUser)
userRouter.delete('/delete-user/:id',deleteUser)


export default userRouter;