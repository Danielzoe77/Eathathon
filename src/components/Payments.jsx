import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import useCarts from "../hooks/useCarts";


const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY
);
const Payments = () => {

  const [cart] = useCarts();
  const calculateTotal = (item) => {
    return item.price * item.quantity;
  };
  // console.log(cart);
// calculate the check-out price
  const cartTotal = cart.reduce((total, item) => {
    return total + calculateTotal(item);
  }, 0);
  // console.log(cartTotal);

  const TotalPrice = parseFloat(cartTotal.toFixed(2));
  // console.log(TotalPrices);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 py-28 px-4">
      <Elements stripe={stripePromise}>
        <CheckOut TotalPrice={TotalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payments;
