import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';
import { partnerlogin, partnerlogout, partnersignup } from '../controllers/authpartnerController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/partnersignup', partnersignup);
router.post('/partnerlogin', partnerlogin);
router.post('/partnerlogout', partnerlogout);



export default router;
