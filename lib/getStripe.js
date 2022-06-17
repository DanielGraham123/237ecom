import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

console.log("apikey: ", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log("apikey2: ", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const loadUpStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );
  }
  return stripePromise;
};

export default loadUpStripe;
