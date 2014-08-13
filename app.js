var express = require('express');
var app = express();
var https = require('https');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var ticker = "YHOO";
  var beg_date = "2014-01-01";
  var end_date = "2014-08-01";
  if (res.req.query.ticker) {
    ticker = res.req.query.ticker;
    beg_date = res.req.query.beg_date;
    end_date = res.req.query.end_date;
  }
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + ticker
          + '%22%20and%20startDate%20%3D%20%22' + beg_date
          + '%22%20and%20endDate%20%3D%20%22' + end_date
          + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
  res.render('index', { url: url, ticker: ticker, beg_date: beg_date, end_date: end_date, escape: function(html) { return html.replace('&amp;', '&'); } });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});