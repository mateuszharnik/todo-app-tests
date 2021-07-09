const { Router } = require('express');
const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('./index.controller');
const { isNotLoggedIn } = require('../../../middlewares/auth');

const router = Router();

router.get('/:id', isNotLoggedIn, getTask);
router.get('/', isNotLoggedIn, getTasks);
router.post('/', isNotLoggedIn, createTask);
router.put('/:id', isNotLoggedIn, updateTask);
router.delete('/:id', isNotLoggedIn, deleteTask);

module.exports = router;
