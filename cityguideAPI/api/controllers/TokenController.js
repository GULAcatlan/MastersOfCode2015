/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res){
		res.jsonx(sails.config.restAuth);
	}
};
