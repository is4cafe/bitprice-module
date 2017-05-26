let bitprice = require('./bin/bitprice-request');
let _        = require('lodash');

let BitCoinPrice = function (callback) {
	let bp = new BitPriceRequest();

	Promise.all([
		bp.BitCoinPrice.request();
	]).then(
		function(results) {
			callback(null, { price: CreateBitPriceResult(results) });
		},
		callback
	);

};
exports.BitCoinPrice  = BitCoinPrice;



let BitCoinRate = function(callback) {

	Promise.all([
		bp.BitCoinPrice.request(),
		bp.BitCoinRate.request()
	]).then(
		function(results) {
			let bitPrice = CreateBitPriceResult(results);
			let bitRates = results[1] || {};

			let results = {};
			_.forEach(bitRates, function(value, key) {
				if (key.match(/BTC_/i)) {
					let name = key.replace('BTC_', '');
					results[name] = {
						name: name,
						btc: rate.lowestAsk,
						jpy: rate.lowestAsk * bitPrice
					};
				}
			});
			callback(null, results);
		},
		callback
	);

};
exports.BitCoinRate = BitCoinRate;



let CreateBitPriceResult = function(data) {
	let price = data[0] && data[0].rate || '0';
	return { price: parseInt(price, 10) };
};