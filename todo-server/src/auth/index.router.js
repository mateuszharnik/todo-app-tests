const { Router } = require('express');
const { signUp, signIn } = require('./index.controller');
const { isLoggedIn } = require('../middlewares/auth');

const router = Router();

router.post('/sign-up', isLoggedIn, signUp);
router.get('/sign-in', isLoggedIn, signIn);

module.exports = router;
