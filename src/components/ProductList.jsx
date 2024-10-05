import React, { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import productListStyle from "../style/productListStyle.module.css"
import { useContextData } from "../store/useContextData";

const ProductList = ({category}) => {
  const[products,setProducts]=useState([])
  const[showProducts,setShowProducts]=useState([])
  const{dispatch}=useContextData()
  const {searchValue} = useContextData().state;

  // handle Search
  const handleSearch=useCallback((value)=>{
    if(value){
      setShowProducts(()=>products.filter((ele)=>ele.title.toUpperCase().includes(value.toUpperCase())))
    }else{
      setShowProducts(products)
    }
  },[products])

  useEffect(()=>{
    handleSearch(searchValue)
  },[searchValue,handleSearch])


  useEffect(()=>{
    let url=category?`https://fakestoreapi.com/products/category/${category}`:"https://fakestoreapi.com/products"
    dispatch({type:"ADD_LOADER"})
    axios.get(url)
    .then((response)=>{
      setProducts(response.data)
    }).catch((error)=>{
      console.log(error)
    }).finally(()=>{
      dispatch({type:"REMOVE_LOADER"})
  })
  },[dispatch,category])


  return (
    
      products.length?
      <div className='py-4 px-2 px-md-3' style={{backgroundColor:"#eaeded"}}>
        <div className='p-3'>
          <h3 className='text-black  text-center'>{category?"Similar products":"Products"}</h3>
          <ul className={`d-flex justify-content-center gap-3 p-0 py-2 ${productListStyle.bullets}`}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
        </div>

      <div className="row g-3 m-0">
          {
            showProducts.length?showProducts.map((ele,index)=>(
              <Product key={ele.id} data={ele} index={index}/>
            )):<h4 className="text-center text-secondary mb-5">No products found</h4>
          }
            
      </div>
    </div>:null
  );
};

export default ProductList
