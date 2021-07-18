const db = require('../db');
const drop = require('./drop');

const seed = async () => {
  try {
    await drop();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    process.exit(0);
  }
};

db.on('open', () => {
  seed();
});
