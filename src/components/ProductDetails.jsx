import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import productDetailsStyle from "../style/productDetailsStyle.module.css"
import layoutStyle from '../style/layoutStyle.module.css'
import { useContextData } from '../store/useContextData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const ProductDetails = ({data,checkoutPage,paymentPage,productDetailsPage,orderPage}) => {
    const { dispatch, state: { user } } = useContextData();
    const navigate=useNavigate()
    const ref=useRef()
    //handel rateing count
  let rate=new Array(5).fill(Math.round(data.rating.rate))
  
  //handel add product to cart process
  
  function handelAddToCart(product){
    if(user){
      dispatch({
        type:"ADD_TO_CART",
        payload:product
      })
    }else{
      toast.warning("Please logged in first",{ theme: "dark" })
    }
  }

  //handle Increase
  function handleIncrease(product){
    dispatch({
        type:"INCREASE_QUANTITY",
        payload:product
    })
  }

  //handle DECREASE
  function handelDecrease(product){
    dispatch({
        type:"DECREASE_QUANTITY",
        payload:product
    })
  }

  //handle Remove Product from cart
  function handleRemoveProduct(product){
    ref.current.classList.add("animate__animated", "animate__backOutRight");
    setTimeout(()=>{
      dispatch({
        type:"REMOVE_PRODUCT",
        payload:product
    })
    },700)
    
    
  }

  return (
    
   
<div className='d-flex flex-wrap justify-content-center flex-md-nowrap gap-3 my-3 p-3 border rounded-4 shadow-sm' ref={ref} style={{animationDuration:'0.8s'}}>
        <div className={productDetailsStyle.img_box} onClick={()=>{navigate(`/products/${data.id}`,{replace:true});window.scrollTo(0,0)}}>
            <img src={data.image} alt='product_img' loading="lazy"/>
        </div>

        <div className='flex-grow-1 w-100'>
            <h5 className={productDetailsStyle.product_title} title={data.title}>{data.title}</h5>
            <p className={productDetailsStyle.product_description} title={data.description}>{data.description}</p>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <strong>Price / unit: {data.price.toFixed(2)}</strong>
                    <small className='fw-bold'>$</small>
                </div>
                <div className='d-flex gap-1'>
                {
                    rate.map((ele,index)=>{
                    if(index+1<=ele){
                        return<FaStar className='text-warning fs-5' key={index}/>
                    }else{
                        return<FaRegStar className='text-black fs-5' key={index}/>
                    }
                    })
                } 
                </div>
            </div>
            {
              checkoutPage||paymentPage?<div className='d-flex align-items-center gap-2 my-3'>
                <Button className={`btn-sm py-0 ${layoutStyle.btn}`} onClick={()=>handleIncrease(data)}><span className='fs-5'>+</span></Button>
                <div className='d-flex  align-items-center'>
                    <p className='m-0'>Quantity: </p>
                    <span className='fs-5'>{data.quantity}</span>
                </div>
                <Button className={`btn-sm btn-danger py-0 ${layoutStyle.btn}`} onClick={()=>handelDecrease(data)}><span className='fs-5'>-</span></Button>
            </div>:null
            }
            {
            orderPage?<div className='d-flex  align-items-center'>
                    <p className='m-0'>Quantity: </p>
                    <span className='fs-5'>{data.quantity}</span>
                </div>:null
            }
            {
              paymentPage||checkoutPage
                ?<Button className={`btn-danger rounded-5 px-4 ${layoutStyle.btn}`} onClick={()=>handleRemoveProduct(data)}>Remove from cart</Button>
                :null
            }
            {
              productDetailsPage?<Button variant="outline-warning" className={`w-50 rounded-5 mt-4 ${layoutStyle.btn}`} onClick={()=>handelAddToCart(data)}>Add to cart</Button>
              :null
            }
            
        </div>
    </div>
   
  )
}

export default ProductDetails