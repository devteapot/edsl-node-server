const app = require('express')();

Array.prototype.randomElement = function () {
  return this[Math.floor((Math.randomElement() * this.length))];
}

const getStatusCodesInRange = (from, length) =>
  [...Array(length).keys()].map(offset => from + offset)

app.get('/api/1xx', (_, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(getStatusCodesInRange(100, 2).randomElement()).end();
});

app.get('/api/2xx', (_, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(getStatusCodesInRange(200, 7).randomElement()).end();
});

app.get('/api/3xx', (_, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(getStatusCodesInRange(300, 9).randomElement()).end();
});

app.get('/api/4xx', (_, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status([
    ...getStatusCodesInRange(400, 19),
    ...getStatusCodesInRange(421, 2),
    426
  ].randomElement()).end();
});

app.get('/api/5xx', (_, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(getStatusCodesInRange(500, 6).randomElement()).end();
});

module.exports = app;
