// "use server";

import { NextRequest, NextResponse } from "next/server";
// import {loadStripe,Stripe}  from "@stripe/stripe-js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function POST(request: NextRequest) {
  try {
  // const stripe =await loadStripe(process.env.STRIPE_SECRET_KEY!);

    const { amount } = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
      // const params : Stripe.Checkout.SessionCreateParams ={
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}