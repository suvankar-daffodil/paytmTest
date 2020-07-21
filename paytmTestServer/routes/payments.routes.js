const router = require('express').Router();

const paymentControllers = require('../controllers/payments.controller');

module.exports = () => {
  router.get('/paytm/pay', paymentControllers.pay);
  router
    .route('/paytm/response')
    .post(paymentControllers.handleCallback)
    .get(paymentControllers.handleResponse);

  return router;
};
