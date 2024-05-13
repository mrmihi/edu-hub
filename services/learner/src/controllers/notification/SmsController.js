var https = require("follow-redirects").https;
var fs = require("fs");

function sendSms(phoneNumber, messageBody) {
  var options = {
    method: "POST",
    hostname: "gglx8j.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization: process.env.INFOBIP_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        destinations: [{ to: phoneNumber }],
        from: "ServiceSMS",
        text: messageBody,
      },
    ],
  });

  req.write(postData);

  req.end();
}

module.exports = sendSms;