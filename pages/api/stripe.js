import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("STRIPE REQUEST:", req.body);

    try {
      const params = {
        mode: "payment",
        submit_type: "pay",
        billing_address_collection: "auto", // ask when necessary
        payment_method_types: ["card"],
        shipping_options: [
          {
            shipping_rate: "shr_1LBQX5AAe1CYlG9Y5WIIoMGG",
          },
          {
            shipping_rate: "shr_1LBQXwAAe1CYlG9YAfKOAix1",
          },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const imageForStripe = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/zp3e7chc/production/"
            )
            .replace("-webp", ".webp");

          console.log("NEW IMAGE: ", imageForStripe);

          return {
            price_data: {
              currency: "usd",
              unit_amount: item.price * 100,
              product_data: {
                name: item.name,
                images: [imageForStripe],
              },
            },
            adjustable_quantity: {
              enabled: true, // allow quantity to be adjusted by customer
              minimum: 1, // min quantity customer must purchase
            },
            quantity: item.quantity, // number of items to purchase
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
