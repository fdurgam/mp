const express = require("express");
const app = express();
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-4798754970937613-041720-cd7aa86b4def541abbee5ba18a204d92-133839272",
});


const port=process.env.PORT || 3000
// Crea un servidor HTTPS con Express
//https.createServer(options, app).listen(80, () => {
  //  console.log('Servidor HTTPS corriendo en el puerto https');
//});
app.listen(port, () => {
    console.log('Servidor HTTPS corriendo en el puerto https');
});