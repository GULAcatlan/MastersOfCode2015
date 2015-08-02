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

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    connection: 'sierMongoDB'
  },
  restAuth: {
    "access_token": "T1RLAQLZPFL9zykBBKRs6nZVZCJMWTGxXxAkmvcuaubf+VRjVY/O3xW+AACgRXRRsNls5fOzw3RmKKo3q7zPKP6VG+DxQPTloKgozL4UiRZ/F8XG8/NshbFc8Zbqnrc3AmWUgumVdThbHtRs9ziEddsAzkyPvNMSXZMSwd0XChbGMqbDsa41ngWJqY+kpXwbUTZw+dE1ukCvFGP3JnDyqdxQQ+jK0OHLgdCR0pocOupKNuE1e5xTjJRHGpi+gbdVZIGfHKth8tz7c/ktAg**",
    "token_type": "bearer",
    "expires_in": 604800
  },

  sabreAPI: {
    application: "GuideMe",
    clientID: "V1:ktdlntwv08gxtn2t:DEVCENTER:EXT",
    clientSecret: "nF4iNvI6",
    authData: setInterval(function() {
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
              }else{
                //FIXME: THIS IS HARMFUL!!!
                getData();
              }
            });
          });

        preReq.write("grant_type=client_credentials");
        preReq.end();
      }
      getData();
    }, 604799)
  }
};
