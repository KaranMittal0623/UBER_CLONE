const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Please enter a valid firstname'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Please enter a valid color'),
    body('vehicle.plate').isLength({min:3}).withMessage('Please enter a valid plate'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Please enter a valid capacity'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto'])  
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;