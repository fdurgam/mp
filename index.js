const express = require("express");
const app = express();
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-4798754970937613-041720-cd7aa86b4def541abbee5ba18a204d92-133839272",
});

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});
const port=process.env.PORT || 3000
app.get("/", (req, res) => {
	const htmlResponse = `
	  <html>
		<head>
		  <title>NodeJs y Express en Vercel</title>
		</head>
		<body>
		  <h1>Soy un proyecto Back end en vercel22</h1>
		</body>
	  </html>
	`;
	res.send(htmlResponse);
  });
app.listen(port, () => {
    console.log('Servidor HTTPS corriendo en el puerto https');
});