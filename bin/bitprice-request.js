let _request = require('request');

const URL    = {
	'BITCOIN_PRICE' : 'https://coincheck.com/api/rate/btc_jpy',
	'BITCOIN_RATE'  : 'https://poloniex.com/public?command=returnTicker'
};


class BitPriceRequest {
	
	let opts;

	constructor(options) {
		let options = options || {};
		opts = {
			url: options.url || '',
			method: options.method || 'GET',
			headers: { 'Content-Type':'application/json' },
			json: true
		};
	}
	

	request() {
		return new Promise(resolve, reject) {
			_request(opts, function(err, res, body) {
				if (err) {
					reject(err);
					return;
				}
				resolve(body);
			});
		}
	}

	BitCoinPrice() {
		opts.url = URL['BITCOIN_PRICE'];
		return this;
	}

	BitCoinRate() {
		opts.url = URL['BITCOIN_RATE'];
		return this;
	}

	url(url) {
		opts.url = url;
		return this;
	}
}