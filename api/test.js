// api/index.js
module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/test') {
    res.status(200).send("Test route is working!");
  } else {
    res.status(404).send("Not Found");
  }
};
