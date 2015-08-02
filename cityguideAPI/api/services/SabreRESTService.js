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

    //It's just a get :D
    https.get(requestOptions, function(response) {
      //Ok... we can recive a lot of data on various chuncks
      var fullChunck = "";
      response.on('data', function(chunck) {
        var mobileResponse = {};

        fullChunck += chunck.toString();

        try {
          var jsonFinal = JSON.parse(fullChunck);

          delete jsonFinal.OriginLocation;
          delete jsonFinal.LoopBackWeeks;
          delete jsonFinal.Links;

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
        } catch (e) {

        }
      });
    });
  },
  topflights: function(req, res) {
    var datePlus3 = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)), //get a date with 3 days in the future
      datePlus8 = new Date(new Date() + (8 * 24 * 60 * 60 * 1000)), // get a date with a 8 days in the future
      dateFlight = datePlus3.getFullYear() + "-" + (datePlus3.getMonth() + 1 < 10 ? "0" + (datePlus3.getMonth() + 1) : datePlus3.getMonth() + 1) + "-" + (datePlus3.getDate() < 10 ? "0" + datePlus3.getDate() : datePlus3.getDate()),
      dateReturn = datePlus3.getFullYear() + "-" + (datePlus3.getMonth() + 1 < 10 ? "0" + (datePlus3.getMonth() + 1) : datePlus3.getMonth() + 1) + "-" + (datePlus3.getDate() < 10 ? "0" + datePlus3.getDate() : datePlus3.getDate()),
      requestOptions = {
        host: urlSabre,
        path: "/v1/shop/flights/fares?origin=" + req.query.origin + "&earliestdeparturedate="+datePlus3+"&latestdeparturedate="+datePlus8+"&lengthofstay=5&maxfare=1000&pointofsalecountry=US&topdestinations=1",
        headers: {
          Authorization: "Bearer " + sails.config.restAuth.access_token
        }
      };

      https.get(requestOptions, function(response){
        var fullChunck = "";
        response.on('data',function(chunck) {
          var mobileResponse = {};

          fullChunck += chunck.toString();

          try {
            var jsonFinal = JSON.parse(fullChunck);

            delete jsonFinal.OriginLocation;
            delete jsonFinal.LoopBackWeeks;
            delete jsonFinal.Links;

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
          } catch (e) {

          }
        })
      });
  },
}
