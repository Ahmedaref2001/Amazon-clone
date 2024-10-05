import React, { useEffect } from "react";
import { useContextData } from "../store/useContextData";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import PaymentMethod from "../components/PaymentMethod";
import layoutStyle from "../style/layoutStyle.module.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user, cart } = useContextData().state;
  const navigate=useNavigate()

  useEffect(()=>{
    if(cart.length===0){
        navigate("/checkout",{replace:true})
    }
  },[navigate,cart])

  return (
    <>
      <Header />
      <div className="border px-2 px-md-3 py-4 bg-light">
        <h5 className="text-center">Checkout {`(${cart.length} items)`}</h5>
      </div>
      <Container style={{ minHeight: "500px" }}>
        <div>
          <div className="border-bottom p-3">
            <h5>
              Hello: <span className="fs-6">{user?.email}</span>
            </h5>
            <h5>
              Delivery Address: <span className="fs-6">Assiut, Egypt</span>
            </h5>
          </div>
        </div>

        <div>
          <div className="p-3">
            <h4 className="text-black  text-center">
              Review items and delivery
            </h4>
            <ul
              className={`d-flex justify-content-center gap-3 p-0 py-2 ${layoutStyle.bullets}`}
            >
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {/* show cart items if already found items in cart unlike show message not found item */}
          <div>
          {
              cart.map((ele) => <ProductDetails data={ele} key={ele.id} paymentPage={true}/>)
          }
          </div>
        </div>
        {cart.length ? <PaymentMethod /> : null}
      </Container>
      <Footer />
    </>
  );
};

export default Payment;
