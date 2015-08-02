var https = require('https'),
  urlSabre = "api.test.sabre.com";

module.exports = {
  topplaces: function(req, res) {
    var requestOptions = {
      host: urlSabre,
      path: "/v1/lists/top/destinations?origin=" + req.query.origin + "&topdestinations=5&loopbackweeks=2",
      headers: {
        Authorization: "Bearer " + sails.config.restAuth.access_token
      }
    };

    https.get(requestOptions, function(response) {
      var fullChunck = "";
      response.on('data', function(chunck) {
        var mobileResponse = {};

        fullChunck += chunck.toString();

        try{
          var jsonFinal = JSON.parse(fullChunck);

          if (jsonFinal.hasOwnProperty('errorCode')) {
            mobileResponse.status = {
              code: 404,
              message: "Something was wrong in the request"
            };
          } else {
            mobileResponse.status = {
              code: 200,
              message: "OK"
            };
            mobileResponse.data = jsonFinal;
          }

          res.jsonx(mobileResponse);
        }catch(e){
          console.log("Not all data has arrived");
        }
//        res.jsonx(mobileResponse);
      });
    });
  },
  topflights: function(req, res) {

  },
}
