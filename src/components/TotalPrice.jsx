import React from "react";
import { NumericFormat } from 'react-number-format';
import { useContextData } from "../store/useContextData";
import { Button } from "react-bootstrap";
import layoutStyle from '../style/layoutStyle.module.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const TotalPrice = () => {
  const { cart } = useContextData().state;
  const navigate=useNavigate()

  let total = cart.reduce((amount, current) => {
    return (amount += current.price * current.quantity);
  }, 0).toFixed(2);

  //function handel navigate to payment page
  function handelNavigateToPayment(){
    if(cart){
      navigate("/checkout/payment")
    }else{
      toast.warning("Your cart is empty, redirect to the products page and add the product you want to your cart!")
    }
   
  }
 
  return (
    <div className="border rounded-3 p-2 p-md-3 mb-5 bg-light">
      <NumericFormat
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={(formattedValue) => (
          <h5>{`The number of products you want ( ${cart.length} items) : Total Price = ${formattedValue}`}</h5>
        )}
      />

     <div className="d-flex gap-1 my-3">
        <input type="checkbox" id="checkbox"/>
        <label htmlFor="checkbox">This order contains a gift</label>
     </div>
     
     <div>
        <Button className={`btn-success rounded-5 px-5 ${layoutStyle.btn}`} onClick={handelNavigateToPayment}>Complete payment</Button>
     </div>

    </div>
  );
};

export default TotalPrice;
