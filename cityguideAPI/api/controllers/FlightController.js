/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findtop: function(req, res) {
		SabreRESTService.topflights(req, res);
	},
};
