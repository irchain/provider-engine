const createPayload = require('./create-payload.js');

module.exports = estimateGas;

function estimateGas(provider, txParams, cb) {
  provider.sendAsync(createPayload({
    method: 'irc_estimateGas',
    params: [txParams],
  }), function(err, res) {
    if (err) {
      // handle simple value transfer case
      if (err.message === 'no contract code at given address') {
        return cb(null, '0xcf08');
      } else {
        return cb(err);
      }
    }
    cb(null, res.result);
  });
}