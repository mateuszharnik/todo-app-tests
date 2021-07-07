const { Router } = require('express');
const { signUp, signIn } = require('./index.controller');

const router = Router();

router.post('/sign-up', signUp);
router.get('/sign-in', signIn);

module.exports = router;
