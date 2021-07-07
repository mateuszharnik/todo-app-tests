const { Router } = require('express');
const auth = require('../../auth/index.router');

const router = Router();

router.get('/', (req, res) => res.status(200).json({ message: 'OK 💙' }));

router.use('/auth', auth);

module.exports = router;
