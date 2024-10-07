import  express  from 'express';
const router = express.Router();

import UserController from '../controllers/UserController.js'

router.route('/register')
.post((req, res) => UserController.register(req, res));



export default router; 