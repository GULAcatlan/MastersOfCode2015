/**
 * FlightController
 *
 * @description :: Server-side logic for managing flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findtop: function(req, res) {
    var topFlights = FlightsService.top();
    //TODO: Decorate json
    res.jsonx(DecorateService.createResponse(topFlights));
  },
};
