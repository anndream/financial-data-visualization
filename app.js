var express = require('express');
var app = express();
var https = require('https');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var url = "";
  if (res.req.query.ticker) {
    url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + res.req.query.ticker
          + '%22%20and%20startDate%20%3D%20%22' + res.req.query.beg_date
          + '%22%20and%20endDate%20%3D%20%22' + res.req.query.end_date
          + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
  }
  res.render('index', { url: url, escape: function(html) { return html.replace('&amp;', '&'); } });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});