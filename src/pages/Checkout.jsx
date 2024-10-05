import React from "react";
import layoutStyle from '../style/layoutStyle.module.css'
import Header from "../components/Header";
import checkoutAdImg from "../images/Discounts-banner-img/checkoutAd.b842b1e4bb0cc75ce652.jpg";
import { useContextData } from "../store/useContextData";
import { Button, Container } from "react-bootstrap";
import ProductDetails from "../components/ProductDetails";
import { Link } from "react-router-dom";
import TotalPrice from "../components/TotalPrice";
import Footer from "../components/Footer"

const Checkout = () => {
  const { user ,cart} = useContextData().state;
  const {dispatch}=useContextData()

  function removeCart(){
    dispatch({
        type:"REMOVE_CART"
    })
  }

  return (
    <>
        <Header />
        <div>
            <img src={checkoutAdImg} alt="" className="w-100" />
            <div className="border-bottom p-3">
            <h4>
                Hello: <span className="fs-5">{user?.email}</span>
            </h4>
            <h4 className="text-center">Your shopping Cart</h4>
            </div>
        </div>
        <Container style={{minHeight:"300px"}}>
        {/* show cart items if already found items in cart unlike show message not found item */}
        <div>
        {
            cart.length?
            cart.map((ele)=>(
                <ProductDetails data={ele} key={ele.id} checkoutPage={true}/>
            ))
            :<h4 className="mt-3 text-secondary">Your cart is empty, go to the products page and add the product you want to the cart  
            <Link to="/" className="text-decoration-none"> Go to shopping</Link></h4>
        }
        </div>
        {/* Button to handel remove cart items */}
        <div className="d-flex justify-content-center gap-5 my-5">
        {
            cart.length? 
            <Button className={`btn-danger rounded-5 px-4 ${layoutStyle.btn}`} onClick={removeCart}>Remove all</Button>
        :null
        }
        </div>
       <div>
       {
        cart.length?<TotalPrice/>:null
       }
       </div>
        </Container>
        <Footer/>
    </>
  );
};

export default Checkout;
