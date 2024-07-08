const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
mercadopago.configure({
	access_token: "TEST-4798754970937613-041720-cd7aa86b4def541abbee5ba18a204d92-133839272",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./client/html-js"));
app.use(cors());
app.get("/", function (req, res) {
	res.status(200).sendFile("index.html");
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

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel 2</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`port runing in http://localhost:${port}`);
});
