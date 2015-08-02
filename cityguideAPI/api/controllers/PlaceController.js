/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findtop: function(req, res) {
    SabreRESTService.topplaces(req, res);
  }/*,
  getRestaurants: function(req, res) {
    var tu = require('../../master-card/test/utils/TestUtils');
    var environment = require('../../master-card/common/Environment');
    var Restaurants = require('../../master-card/services/restaurants/RestaurantsLocalFavoritesService');
    console.log(Restaurants);

		tu = new tu.TestUtils();

    var masterRestaurants = new Restaurants.RestaurantsLocalFavoritesService(
      tu.getConsumerKey(),
      tu.generatePrivateKeyForTest(),
      environment.sandbox);

		function restaurantsCallback(){
			console.log(arguments);

			res.jsonx({});
		}

    masterRestaurants.getRestaurants({
			"PageOffset":10,
			"PageLength": 10,
			"Category":"Mexican",
			"AddressLine1":"1010 Sunnyvale",
			"AddressLine2":"Saratoga Rd",
			"City":"Sunnyvale",
			"CountrySubdivision":"CA",
			"PostalCode":"94087",
			"Country": "EE. UU.",
			"Latitude":"37.359433",
			"Longitude":"-122.031569,17",
			"DistanceUnit":"mil",
			"Radius":2
		});
  }*/
};
