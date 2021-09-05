const express = require("express")
const app = express()
const cors = require("cors")
const stripe = require("stripe")
require("dotenv").config()
let port = process.env.PORT || 4000

app.use(express.json())
app.use(cors({ origin: true}))
const stripeKey = stripe(process.env.STRIPE_KEY)


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")  
})

app.post("/create-one-time-checkout-session", async (req,res) => {
	const domainURL = "http://localhost:3000"
	const customer_email = req.body.customer_email
	const line_items = req.body.line_items

	if (!line_items || !customer_email){
		return res.status(400).json({error: "Backend Error: missing parameters"})
	}
	let session;

	try{
		session = await stripeKey.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			customer_email,
			mode: 'payment',
			success_url: `${domainURL}/success`,
			cancel_url: `${domainURL}/canceled`
		})

		res.status(200).json({sessionId: session.id})

	}
	catch(error) {
		console.log(error)
		res.status(400).json({error: `Backend error: ${error}`})
	}
})

app.post("/create-monthly-checkout-session", async (req,res) => {
	const domainURL = "http://localhost:3000"
	const customer_email = req.body.customer_email
	const line_items = req.body.line_items

	if (!line_items || !customer_email){
		return res.status(400).json({error: "Backend Error: missing parameters"})
	}
	let session;

	try{
		session = await stripeKey.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			customer_email,
			mode: 'subscription',
			success_url: `${domainURL}/success`,
			cancel_url: `${domainURL}/canceled`
		})

		res.status(200).json({sessionId: session.id})

	}
	catch(error) {
		console.log(error)
		res.status(400).json({error: `Backend error: ${error}`})
	}
})

for (let c = 1; c <= 7; c++){
	app.get(`/GlampingImg${c}`, (req,res) => {
		res.sendFile(__dirname + `/assets/GlampingImg#${c}.jpg`)
	})
}


app.listen(port, () => console.log(`App server initalized on port ${port}`))

