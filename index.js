let bitprice = require('./bin/bitprice-request')();
let _        = require('lodash');

let BitCoinPrice = function (callback) {

	Promise.all([
		bitprice.BitCoinPrice().request()
	]).then(
		function(results) {
			callback(null, CreateBitPriceResult(results) );
		},
		callback
	);

};
exports.BitCoinPrice  = BitCoinPrice;



let BitCoinRate = function(callback) {

	Promise.all([
		bitprice.BitCoinPrice().request(),
		bitprice.BitCoinRate().request()
	]).then(
		function(results) {
			let bitPrice = CreateBitPriceResult(results);
			let bitRates = results[1] || {};

			let result = {
				'BTC': { btc: 1, jpy: bitPrice.price }
			};
			_.forEach(bitRates, function(value, key) {
				if (key.match(/BTC_/i)) {
					let name = key.replace('BTC_', '');
					result[name] = {
						btc: value.lowestAsk,
						jpy: value.lowestAsk * bitPrice.price
					};
				}
			});
			callback(null, result);
		},
		callback
	);

};
exports.BitCoinRate = BitCoinRate;



let CreateBitPriceResult = function(data) {
	let price = data[0] && data[0].rate || '0';
	return { price: parseInt(price, 10) };
};