var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users balances. */
router.get('/userbalances', function(req, res, next) {
	// Comment out this line:
  console.log(req.query);
  axios.get('https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=' + req.query.api_key)
    .then((response) => {
      console.log(response.data);
      console.log("sending 200")
      res.send(response.data);
    });
});

module.exports = router;