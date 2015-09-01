/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
var fs = require('fs'),
  path = require('path');

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    //connection: 'sierMongoDB'
    connection: 'localDiskDb'
  },
  restAuth: {
    get access_token() {
      return fs.readFileSync(path.resolve(__dirname, 'token'), 'utf-8').toString();
      //return "T1RLAQLZPFL9zykBBKRs6nZVZCJMWTGxXxAkmvcuaubf+VRjVY/O3xW+AACgRXRRsNls5fOzw3RmKKo3q7zPKP6VG+DxQPTloKgozL4UiRZ/F8XG8/NshbFc8Zbqnrc3AmWUgumVdThbHtRs9ziEddsAzkyPvNMSXZMSwd0XChbGMqbDsa41ngWJqY+kpXwbUTZw+dE1ukCvFGP3JnDyqdxQQ+jK0OHLgdCR0pocOupKNuE1e5xTjJRHGpi+gbdVZIGfHKth8tz7c/ktAg**";
    },
    "token_type": "bearer",
    "expires_in": 604800
  },

  sabreAPI: {
    application: "GuideMe",
    clientID: "V1:ktdlntwv08gxtn2t:DEVCENTER:EXT",
    clientSecret: "nF4iNvI6",
    authDataId: setInterval(function() {
        var b64Client = B64(B64("V1:ktdlntwv08gxtn2t:DEVCENTER:EXT") + ":" + B64("nF4iNvI6"));

        function B64(s) {
          var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            o = [];
          for (var i = 0, n = s.length; i < n;) {
            var c1 = s.charCodeAt(i++),
              c2 = s.charCodeAt(i++),
              c3 = s.charCodeAt(i++);
            o.push(c.charAt(c1 >> 2));
            o.push(c.charAt(((c1 & 3) << 4) | (c2 >> 4)));
            o.push(c.charAt(i < n + 2 ? ((c2 & 15) << 2) | (c3 >> 6) : 64));
            o.push(c.charAt(i < n + 1 ? c3 & 63 : 64));
          }
          return o.join("");
        }

        function getData() {
          var http = require('https'),
            postOpt = {
              host: "api.test.sabre.com",
              path: "/v2/auth/token",
              method: "POST",
              headers: {
                Authorization: "Basic " + b64Client,
                "Content-Type": "application/x-www-form-urlencoded"
              }
            },
            preReq = http.request(postOpt, function(res) {
              res.setEncoding("utf8");
              res.on("data", function(chunck) {
                var answer = JSON.parse(chunck);
                console.log(postOpt);
                console.log("New Auth token arrived!", answer);
                if (!answer.hasOwnProperty("error")) {
                  sails.config.restAuth = answer;
                  //TODO: update this to kill current time and start a new one with the time obtained in answer.expires_in
                  fs.writeFile(path.resolve(__dirname, 'token'), answer.access_token, {
                    flag: 'w+'
                  }, function(err) {
                    if (err) {
                      console.log(err);
                      return;
                    }

                    console.log("The Token is updated ", answer);
                  });
                } else {
                  //FIXME: THIS IS HARMFUL!!!
                  getData();
                }
              });
            });

          preReq.write("grant_type=client_credentials");
          preReq.end();
        }
        getData();
      }, sails.config.restAuth.expires_in * 60)
  }
};
