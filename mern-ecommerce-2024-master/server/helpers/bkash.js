const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "shdshdasd23512631231",
  client_secret: "jhsdsdhjgf2356321",
});

module.exports = paypal;
