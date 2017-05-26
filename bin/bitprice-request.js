let _request = require('request');

const URL    = {
	'BITCOIN_PRICE' : 'https://coincheck.com/api/rate/btc_jpy',
	'BITCOIN_RATE'  : 'https://poloniex.com/public?command=returnTicker'
};


class BitPriceRequest {

	constructor(options) {
		options = options || {};
		this.opts = {
			url: options.url || '',
			method: options.method || 'GET',
			headers: { 'Content-Type':'application/json' },
			json: true
		};
	}
	

	request() {
		let _opts = this.opts;
		return new Promise(function (resolve, reject) {
			_request(_opts, function(err, res, body) {
				if (err) {
					reject(err);
					return;
				}
				resolve(body);
			});
		});
	}

	BitCoinPrice() {
		this.opts.url = URL['BITCOIN_PRICE'];
		return this;
	}

	BitCoinRate() {
		this.opts.url = URL['BITCOIN_RATE'];
		return this;
	}

	url(url) {
		this.opts.url = url;
		return this;
	}
}

module.exports = function(opts) {
	return new BitPriceRequest(opts);
};