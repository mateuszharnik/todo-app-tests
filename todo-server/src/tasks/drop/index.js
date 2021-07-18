const User = require('../../api/v1/users/index.model');
const Board = require('../../api/v1/boards/index.model');
const Task = require('../../api/v1/tasks/index.model');

const drop = async () => {
  try {
    await User.deleteMany();
    await Board.deleteMany();
    await Task.deleteMany();

    // eslint-disable-next-line no-console
    console.log('Database was dropped.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

module.exports = drop;
