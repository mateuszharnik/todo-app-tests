const { Router } = require('express');
const auth = require('../../auth/index.router');
const users = require('./users/index.router');
const boards = require('./boards/index.router');
const tasks = require('./tasks/index.router');

const router = Router();

router.get('/', (req, res) => res.status(200).json({ message: 'OK 💙' }));

router.use('/auth', auth);
router.use('/users', users);
router.use('/boards', boards);
router.use('/tasks', tasks);

module.exports = router;
