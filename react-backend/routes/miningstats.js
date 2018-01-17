var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users balances. */
router.get('/userbalances', function(req, res, next) {
  let coinMarketCapPromiseStack = [];
  axios.get('https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=' + req.query.api_key)
    .then((response) => {
      if(response.data.getuserallbalances && response.data.getuserallbalances.data) {
        response.data.getuserallbalances.data.forEach( (coin) => {

          // TODO: better way of handling this
          if(coin.coin == "digibyte-skein") {
            coin.coin = "digibyte";
          }
          if(coin.coin == "myriadcoin-skein") {
            coin.coin = "myriadcoin";
          }
          coinMarketCapPromiseStack.push(axios.get('https://api.coinmarketcap.com/v1/ticker/' + coin.coin)
            .then((response) => {
              coin.confirmed_usd_value = response.data[0].price_usd * coin.confirmed;
            })
            .catch((err) => {
              coin.confirmed_usd_value = null;
            }));
        });
      }
      axios.all(coinMarketCapPromiseStack).then(() => {
        res.send(response.data);
      })
      .catch(err => console.log(err));
    });
});


router.get('/usdbalances', function(req,res,next) {
  let coinMarketCapPromiseStack = [];
  let data = [];
  axios.get('https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=' + req.query.api_key)
    .then((response) => {
      if(response.data.getuserallbalances && response.data.getuserallbalances.data) {
        response.data.getuserallbalances.data.forEach( (coin) => {

          // TODO: better way of handling this
          if(coin.coin == "digibyte-skein") {
            coin.coin = "digibyte";
          }
          if(coin.coin == "myriadcoin-skein") {
            coin.coin = "myriadcoin";
          }
          coinMarketCapPromiseStack.push(axios.get('https://api.coinmarketcap.com/v1/ticker/' + coin.coin)
            .then((response) => {
              let dataObj = {};
              let usdPrice = response.data[0].price_usd;

              dataObj['name'] = coin.coin;
              dataObj['value'] = usdPrice * coin.confirmed + usdPrice * coin.unconfirmed + usdPrice * coin.ae_confirmed + usdPrice * coin.ae_unconfirmed + usdPrice * coin.exchange;
              data.push(dataObj);
            })
            .catch((err) => {
              let dataObj = {};
              dataObj['name'] = coin.coin;
              dataObj['value'] = null;
              data.push(dataObj);
            }));
        });
      }
      axios.all(coinMarketCapPromiseStack).then(() => {
        data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        res.send(data);
      })
      .catch(err => console.log(err));
    });
});

module.exports = router;