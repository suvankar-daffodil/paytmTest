const config = require('../config/config');
const { genchecksum } = require('../utils/checksum');

module.exports = {
  pay: async (req, res) => {
    let request = {
      MID: config.MERCHANT_ID,
      ORDER_ID: 'orderId18',
      CUST_ID: 'customerId18',
      TXN_AMOUNT: '100',
      CHANNEL_ID: 'WAP',
      WEBSITE: 'WEBSTAGING',
      INDUSTRY_TYPE_ID: 'Retail',
      CALLBACK_URL: config.CALLBACK_URL,
    };
    const checkSum = await genchecksum(request, config.MERCHANT_KEY);

    request['CHECKSUMHASH'] = checkSum;
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Merchant Checkout Page</title>');
    res.write("<meta charset='utf-8'>");
    res.write("<meta http-equiv='X-UA-Compatible' content='IE=edge'>");
    res.write(
      "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    );
    res.write('</head>');
    res.write('<body>');
    res.write('<center><h1>Please do not refresh this page...</h1></center>');
    res.write(
      '<form method="post" action="' +
        config.TRANSACTION_URL +
        '" name="paytm_form">'
    );
    for (let x in request) {
      res.write(
        '<input type="hidden" name="' + x + '" value="' + request[x] + '">'
      );
    }
    res.write(
      '<input type="hidden" name="CHECKSUMHASH" value="' + checkSum + '">'
    );
    res.write('</form>');
    res.write('<script type="text/javascript">');
    res.write('document.paytm_form.submit();');
    res.write('</script>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  },

  handleCallback: (req, res) => {
    res.redirect(
      `/paytm/response?STATUS=${req.body.STATUS}&TXNID=${req.body.TXNID}`
    );
  },

  handleResponse: (req, res) => {
    res.end();
  },
};
