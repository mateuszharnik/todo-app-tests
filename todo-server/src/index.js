const app = require('./app');
const config = require('./config');
const db = require('./db');

const { SERVER_PORT, SERVER_URL } = config;

db.on('open', () => {
  // eslint-disable-next-line no-console
  app.listen(SERVER_PORT, () => console.log(`App listening on ${SERVER_URL}`));
});
