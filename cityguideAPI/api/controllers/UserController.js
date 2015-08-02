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
    User.native(function(err, UserCollection) {
      console.log(UserCollection);
      res.jsonx({
        hola: "banda"
      });
    });
  },
  update: function(req, res) {
    User.native(function(err, UserCollection) {
      if (err) {
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
  },
  findGuides: function(req, res) {
    var fakes = require('../../5').items,
      range1 = Math.floor(Math.random() * (50 - 18)) + 18,
      rango2 = Math.floor(Math.random() * (50 - 18)) + 18,
      minRange = range1 < rango2 ? range1 : rango2,
      maxRange = range1 > rango2 ? range1 : rango2,
      selected = fakes.filter(function(objP) {
        return (objP.age >= minRange && objP.age <= maxRange);
      });

    res.jsonx({
      status: {
        code: 200,
        message: "Ok"
      },
      data: selected
    });
  }
};
