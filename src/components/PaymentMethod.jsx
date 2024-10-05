import React, { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useContextData } from "../store/useContextData";
import { Button, Form } from "react-bootstrap";
import layoutStyle from "../style/layoutStyle.module.css";
import paymentMethodStyle from "../style/paymentMethodStyle.module.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const PaymentMethod = () => {
  const { cart,user } = useContextData().state;
  const { dispatch } = useContextData();
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);  // Default to false
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Calculate the total price
  const total = cart
    .reduce((amount, current) => (amount += current.price * current.quantity), 0)
    .toFixed(2);

  const getClientSecret = useCallback(() => {
    axios
      .post(
        `http://127.0.0.1:5001/clone-986a7/us-central1/api/payments/create?total=${total * 100}`
      )
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [total]);


  const handleChange = (e) => {
    setDisabled(false); 
    setError(e.error?.message);  
  };

  const handleSubmit = async () => {
    if (!clientSecret) return;  

    setProcessing(true);
    try {
       await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }).then((res)=>{
        const ref=doc(db,"users",user?.uid,"orders",res.paymentIntent.id)
        setDoc(ref,{
          cart,
          amount:res.paymentIntent.amount,
          created:res.paymentIntent.created
        })
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate("/orders", { replace: true });
        dispatch({ type: "REMOVE_CART" });

      }).catch((error)=>{
        setError(error.message);
        setProcessing(false);
      })
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  useEffect(() => {
    getClientSecret();
  }, [getClientSecret]);



  return (
    <>
      <div
        className={`border rounded-3 p-2 p-md-3 my-5 bg-light ${paymentMethodStyle.payment_box}`}
      >
        <h5 className="text-center mb-4">Payment Method</h5>

        <CardElement onChange={handleChange} />

        <NumericFormat
          value={total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(formattedValue) => (
            <h5  className="mt-3">{`Total Price = ${formattedValue}`}</h5>
          )}
        />

        <div className="mt-3">
          <Button
            className={`btn-success rounded-5 w-50 d-block mx-auto ${layoutStyle.btn}`}
            onClick={handleSubmit}
            disabled={disabled||succeeded||processing}
          >
          {
            processing?"Processing...":"Buy now"
          }
          </Button>
        </div>
        
          <Form.Control.Feedback type="invalid" className={error?"d-block":"none"}>
                  {error}
          </Form.Control.Feedback>
        
      </div>
    </>
  );
};

export default PaymentMethod;
