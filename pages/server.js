import { loadStripe } from "@stripe/stripe-js";

export async function getStaticProps() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return {
    props: {
      stripePromise,
    },
  };
}
