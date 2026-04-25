import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_STRIPE_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    const session = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
