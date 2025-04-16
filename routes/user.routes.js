import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/user.controller.js';



const router = express.Router();




router.get('/all', getAllUsers);
router.get('/single/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);




export default router