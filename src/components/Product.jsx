import React from 'react'
import productStyle from "../style/productStyle.module.css"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {useContextData} from "../store/useContextData"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Product = ({data,index}) => {
  const { user } = useContextData().state;
  const {dispatch}=useContextData()
  const navigate=useNavigate()
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

  return (
    
    <div className={`col-12 ${(index+3)%5===0?'col-sm-12':'col-sm-6'}  ${(index+3)%5===0||(index+2)%5===0?'col-md-6':'col-md-6'}  ${(index+2)%5===0||(index+1)%5===0?'col-lg-6':'col-lg-4'}`}>
      <div className={`p-3 border h-100 rounded-3 overflow-hidden position-relative ${productStyle.product_box}`}>
        <h5 title={data.title} className={productStyle.product_title}>{data.title}</h5>
        <p title={data.description} className={productStyle.product_description}>{data.description}</p>
       
        <div className={`${productStyle.product_img} py-3`} onClick={()=>{navigate(`/products/${data.id}`);window.scrollTo(0,0)}}>
          <img src={data.image} alt='product-img' loading="lazy"/>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <strong>{data.price.toFixed(2)}</strong>
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
        <button type="button" className={`btn btn-outline-warning w-50 position-absolute ${productStyle.add_btn}`} onClick={()=>handelAddToCart(data)}>Add to cart</button>
      </div>
    </div>
   
  )
}

export default Product