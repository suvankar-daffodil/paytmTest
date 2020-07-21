const app = require('express')();
const bodyParser = require('body-parser');
require('cors')();

module.exports = () => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const router = require('../routes/payments.routes')();
  app.use('/', router);

  return app;
};
