const app = require('./config/express')();

app.listen(5000, () => {
  console.log('server running.......');
});
