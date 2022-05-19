const express = require("express");
const request = require("request");
const router = express.Router();
const API_KEY = "01V2YH5II47S2OBQ";

// Route:-1 search stock
router.get(
  "/search",
  async (req, res) => {
    const query = req.query.query;
    // If there are errors, return Bad request and the errors
    var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;

    await request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, response, data) => {
        if (err) {
        res.send(err);
        } else if (response.statusCode !== 200) {
        res.send(response);
        } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
        }
    });
  }
);

router.get(
    "/search",
    async (req, res) => {
      const query = req.query.query;
      // If there are errors, return Bad request and the errors
      var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;
  
      await request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
      }, (err, response, data) => {
          if (err) {
          res.send(err);
          } else if (response.statusCode !== 200) {
          res.send(response);
          } else {
          // data is successfully parsed as a JSON object:
          res.json(data);
          }
      });
    }
  );

  router.get(
    "/details",
    async (req, res) => {
      const symbol = req.query.symbol;
      // If there are errors, return Bad request and the errors
      var url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
  
      await request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
      }, (err, response, data) => {
          if (err) {
          res.send(err);
          } else if (response.statusCode !== 200) {
          res.send(response);
          } else {
          // data is successfully parsed as a JSON object:
          res.json(data);
          }
      });
    }
  );

  router.get(
    "/timeseries",
    async (req, res) => {
      const granularity = req.query.granularity;
      const symbol = req.query.symbol;
      // If there are errors, return Bad request and the errors
      var url = `https://www.alphavantage.co/query?function=${granularity}&symbol=${symbol}&apikey=${API_KEY}`;
      if(granularity==="TIME_SERIES_INTRADAY") {
          url+='&interval=5min'
      }
  
      await request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
      }, (err, response, data) => {
          if (err) {
          res.send(err);
          } else if (response.statusCode !== 200) {
          res.send(response);
          } else {
          // data is successfully parsed as a JSON object:
          res.json(data);
          }
      });
    }
  );

module.exports = router;
