// //https://github.com/sonnysangha/stripe-payment-elements-with-https-nextjs-14-demo referenced this tutorial!
// "use client";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
//   Elements,
// } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";
// import convertToSubcurrency from "@/services/currency";
// import { Button } from "./ui/button";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
// );

// const CheckoutPage = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     async function createPaymentSession() {
//       try {
//         const response = await fetch("/api/checkout-sessions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//         });
//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         setError("Failed to create payment session.");
//       }
//     }
//     createPaymentSession();
//   }, [amount]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!stripe || !elements) {
//       setError("Stripe.js has not loaded yet.");
//       return;
//     }
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setError(submitError.message || "Payment submission failed.");
//       setLoading(false);
//       return;
//     }
//     const { error: confirmError } = await stripe.confirmPayment({
//       elements,
//       clientSecret: clientSecret!,
//       confirmParams: {
//         return_url: `${window.location.origin}/checkout/success?amount=${amount}`,
//       },
//     });
//     if (confirmError) {
//       setError(confirmError.message || "Payment confirmation failed.");
//     }
//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return <div>Loading payment form...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       {clientSecret ? <PaymentElement /> : <div>Loading payment form...</div>}
//       {error && <div className="text-red-500 mt-4">{error}</div>}
//       <div className="flex justify-items-center justify-center">
//         <Button
//           type="submit"
//           variant="magnolia"
//           disabled={!stripe || loading}
//           className="mt-4"
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// const Wrapper = ({ amount }: { amount: number }) => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const response = await fetch("/api/checkout-sessions", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//         });
//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         throw new Error("Failed to fetch client secret");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientSecret();
//   }, [amount]);

//   if (loading || !clientSecret) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{
//         clientSecret: clientSecret,
//       }}
//     >
//       <div className="max-w-lg">
//         <CheckoutPage amount={amount} />
//       </div>
//     </Elements>
//   );
// };

// export default Wrapper;
