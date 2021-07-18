const { Router } = require('express');
const {
  getUser,
  updateEmail,
  updateUsername,
  updatePassword,
  updateAvatar,
  deleteAvatar,
  deleteUser,
} = require('./index.controller');
const { isNotLoggedIn } = require('../../../middlewares/auth');

const router = Router();

router.get('/:id', isNotLoggedIn, getUser);
router.patch('/:id/email', isNotLoggedIn, updateEmail);
router.patch('/:id/username', isNotLoggedIn, updateUsername);
router.patch('/:id/password', isNotLoggedIn, updatePassword);
router.patch('/:id/avatar', isNotLoggedIn, updateAvatar);
router.delete('/:id/avatar', isNotLoggedIn, deleteAvatar);
router.delete('/:id', isNotLoggedIn, deleteUser);

module.exports = router;
