/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findtop: function(req, res){
		SabreRESTService.topplaces(req, res);
	}
};
