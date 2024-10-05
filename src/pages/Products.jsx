import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContextData } from "../store/useContextData";
import Loader from "../components/Loader";
import axios from "axios";
import ProductDetails from "../components/ProductDetails";
import { Container } from "react-bootstrap";

const Products = () => {
  const [product, setProduct] = useState({});
  const [specificCategorie, setSpecificCategorie] = useState("");
  const { loading } = useContextData().state;
  const { dispatch } = useContextData();
  const { id, category } = useParams();



  //fetch Specific Product
  const fetchSpecificProduct = useCallback(() => {
    dispatch({ type: "ADD_LOADER" });
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setSpecificCategorie(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "REMOVE_LOADER" });
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (!isNaN(id)) {
      fetchSpecificProduct();
    }
  }, [fetchSpecificProduct, id]);

  return (
    <>
      {loading && <Loader />}

      <Header />
      <div style={{minHeight:"500px"}}>

      {Object.keys(product).length ? (
        <Container className="my-5">
          <ProductDetails data={product} productDetailsPage={true} />
        </Container>
      ) : null}

      {
        Object.keys(product).length||category ?<ProductList category={category || specificCategorie} />:null
      }
            
      </div>
      
      <Footer />
    </>
  );
};

export default Products;
