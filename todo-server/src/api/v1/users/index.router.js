const { Router } = require('express');
const {
  getUser,
  updateEmail,
  updateUsername,
  updatePassword,
  updateAvatar,
  deleteUser,
} = require('./index.controller');

const router = Router();

router.get('/:id', getUser);
router.patch('/:id/email', updateEmail);
router.patch('/:id/username', updateUsername);
router.patch('/:id/password', updatePassword);
router.patch('/:id/avatar', updateAvatar);
router.delete('/:id', deleteUser);

module.exports = router;
