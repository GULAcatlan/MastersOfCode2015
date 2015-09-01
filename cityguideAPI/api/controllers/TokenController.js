/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res){
		console.log("TOKEN: ",sails.config.restAuth);
		res.jsonx(sails.config.restAuth);
	},
	sier: function(req, res){
		console.log(sails.config.sabreAPI);
	}
};
