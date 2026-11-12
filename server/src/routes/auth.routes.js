const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
authRouter.post('/register',authController.registerUserController);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user with email and password
 * @access  Public
 */
authRouter.post('/login',authController.loginUserController);

/**
 * @route   GET /api/auth/me
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
authRouter.get('/me', authMiddleware.authUser, authController.getCurrentUserController);

/**
 * @route   GET /api/auth/logout
 * @desc    clear the token from user cookie and add the token to the blacklist
 * @access  Public
 */
authRouter.get('/logout',authController.logoutUserController);




module.exports = authRouter;