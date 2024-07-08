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

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});
const port=process.env.PORT || 3000
app.get("/", (req, res) => {
	const htmlResponse = `
	<!DOCTYPE html>
	<html>
	
	<head>
	  <title>Template Code - Checkout Pro</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	  <link rel="stylesheet" type="text/css" href="css/index.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	  <script src="https://sdk.mercadopago.com/js/v2"></script>
	  <script type="text/javascript" src="js/index.js" defer></script>
	</head>
	
	<body>
	  <main>
		<!-- Shopping Cart -->
		<section class="shopping-cart dark">
		  <div class="container" id="container">
			<div class="block-heading">
			  <h2>Shopping Cart</h2>
			  <p>This is an example of Checkout Pro integration of Mercado Pago</p>
			</div>
			<div class="content">
			  <div class="row">
				<div class="col-md-12 col-lg-8">
				  <div class="items">
					<div class="product">
					  <div class="info">
						<div class="product-details">
						  <div class="row justify-content-md-center">
							<div class="col-md-3">
							  <img class="img-fluid mx-auto d-block image" alt="Image of a product" src="img/product.png">
							</div>
							<div class="col-md-4 product-detail">
							  <h5>Product</h5>
							  <br class="product-info">
							  <br>
							  <b>Description: </b><span id="product-description">Some book</span><br>
							  <b>Author: </b>Dale Carnegie<br>
							  <b>Number of pages: </b>336<br>
							  <b>Price:</b> $ <span id="unit-price">10</span>
							</div>
						  </div>
						  <div class="col-md-3 product-detail">
							<label for="quantity">
							  <b>Quantity</b>
							</label>
							<input type="number" id="quantity" value="1" min="1" class="form-control">
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			  <div class="col-md-12 col-lg-4">
				<div class="summary">
				  <h3>Cart</h3>
				  <div class="summary-item"><span class="text">Subtotal</span><span class="price" id="cart-total"></span>
				  </div>
				  <button class="btn btn-primary btn-lg btn-block" id="checkout-btn">Checkout</button>
				</div>
			  </div>
			</div>
		  </div>
		</section>
		<!--payment-->
		<section class="payment-form dark">
		  <div class="container_payment">
			<div class="block-heading">
			  <h2>Checkout Payment</h2>
			  <p>This is an example of a Mercado Pago integration</p>
			</div>
			<div class="form-payment">
			  <div class="products">
				<h2 class="title">Summary</h2>
				<div class="item">
				  <span class="price" id="summary-price"></span>
				  <p class="item-name">Book x <span id="summary-quantity"></span></p>
				</div>
				<div class="total">Total<span class="price" id="summary-total"></span></div>
			  </div>
			  <div class="payment-details">
				<div class="form-group col-sm-12">
				  <br>
				  <div id="button-checkout"></div>
				  <br>
				  <a id="go-back">
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
					  <path fill="#009EE3" fill-rule="nonzero" id="chevron_left"
						d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
					</svg>
					Go back to Shopping Cart
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		</section>
		<!-- footer -->
	  </main>
	  <footer>
		<div class="footer_logo">
		  <img id="horizontal_logo" alt="image of the logo" src="img/horizontal_logo.png">
		</div>
		<div class="footer_text">
		  <p>Developers Site:</p>
		  <p><a href="https://developers.mercadopago.com" target="_blank">https://developers.mercadopago.com </a></p>
		</div>
	  </footer>
	</body>
	
	</html>
	`;
	res.send(htmlResponse);
  });

 
app.listen(port, () => {
    console.log('Servidor HTTPS corriendo en el puerto https');
});