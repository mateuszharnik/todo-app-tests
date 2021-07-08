const { Router } = require('express');
const {
  getBoard,
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} = require('./index.controller');
const { isNotLoggedIn } = require('../../../middlewares/auth');

const router = Router();

router.get('/:id', isNotLoggedIn, getBoard);
router.get('/', isNotLoggedIn, getBoards);
router.post('/', isNotLoggedIn, createBoard);
router.put('/:id', isNotLoggedIn, updateBoard);
router.delete('/:id', isNotLoggedIn, deleteBoard);

module.exports = router;
