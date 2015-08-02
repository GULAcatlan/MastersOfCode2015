/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res) {

  },
  create: function(req, res) {
		console.log(User);
		console.log("_________________________");
		User.native(function(err, UserCollection){
			console.log(UserCollection);
			res.jsonx({hola:"banda"});
		});
  },
  update: function(req, res) {
    User.native(function(err, UserCollection) {
			if(err){
				//TODO: Send and error JSON
			}

			//TODO: Stuff with the req data
			/*
			UserCollection.aggregate(
        {"$match": {"gender": "Male"} },
        {"$group": { "_id": "$socialNetwork", "count": {"$sum":1} } },
        function (err, results) {
          //do stuff with results
      });
			*/
		});
  }
};
