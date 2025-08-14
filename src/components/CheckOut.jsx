import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ TotalPrice, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // check the total price
   if(typeof TotalPrice !== 'number' || TotalPrice < 1){
    return;
     
   }
    

    axiosSecure.post('/create-payment-intent', {TotalPrice})
        .then(res => {
            // console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    }, [TotalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
        console.log('[error]', error);
        setCardError(error.message)
      } else {
        setCardError('success')
        // console.log('[PaymentMethod]', paymentMethod);
      }
      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
       clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'anonymous',
              email: user?.email || 'anonymous',
            },
          },
        },
      );

      if(confirmError){
        console.log(confirmError);
      }
 
      console.log('payment intent', paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        // console.log('payment successful');
        setCardError(`your transaction id: ${paymentIntent.id}`);
//payment info data
        const paymentInfo = {
          email : user.email,
          tansactionId : paymentIntent.id,
          TotalPrice,
          quantity : cart.length,
          status : "Order Pending",
          itemName : cart.map(item => item.name),
          cartItems : cart.map(item => item._id),
          menuItems : cart.map(item => item.menuItemId),
        }
        console.log(paymentInfo)

        //send information to the backend
        axiosSecure.post('/payments',paymentInfo )
        .then(res =>{
          console.log(res.data)
          alert('your payment is successful');
          navigate('/order')

        })

      }
  };

  // console.log(TotalPrice)
  return (
    <div className="flex justify-between flex-col sm:flex-row items-start gap-8">
      <div className="md:w-1/2 space-y-3 w-full">
        <h4 className="font-semibold text-lg">Order Summary</h4>
        <p>Total Price: ${TotalPrice}</p>
        <p>Number of Items: {cart.length}</p>
      </div>

      {/* right side */}
      <div className="md:w-1/3 px-4 py-8 space-y-5 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h4 className="font-semibold text-lg">Process Your Payment</h4>
        <h5 className="font-medium ">Credit/Debit Card</h5>
        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-primary w-full text-center text-white"
          >
            Pay
          </button>
        </form>

        {
            cardError ? <p className="text-red italic text-sm">{cardError}</p> : ''
        }

        {/* {cardError && <p className="text-red-600">{cardError}</p>} */}

        {/* paypal */}

        <div className="mt-5 text-center">
            <hr />
            <button type="submit" className="btn btn-sm mt-5 bg-orange-500 text-center text-white">
                <FaPaypal className="text-3xl" /> Pay with Paypal   

            </button>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;
