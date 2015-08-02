/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findtop: function(req, res) {
		SabreRESTService.topflight(req, res);
	},
	buyticket: function(req, res){
		var mastercard = require('mastercard-api');
		console.log(mastercard);
		res.jsonx(mastercard);
	}
};
