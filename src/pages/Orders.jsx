import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useContextData } from '../store/useContextData';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Container } from 'react-bootstrap';
import layoutStyle from '../style/layoutStyle.module.css';
import Order from '../components/Order';
import Footer from '../components/Footer'
import Loader from '../components/Loader';

const Orders = () => {
  const { user,loading } = useContextData().state;
  const { dispatch } = useContextData();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch({ type: "ADD_LOADER" });
    if (user) {
      const collRef = collection(db,"users",user.uid,"orders");
      const orderRef = query(collRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(orderRef, (QuerySnapshot) => {
        setOrders(
          QuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
        dispatch({ type: "REMOVE_LOADER" });
      });

      // Cleanup function
      return () => unsubscribe();
    } else {
      setOrders([]);
      dispatch({ type: "REMOVE_LOADER" });
    }
  }, [user,dispatch]);
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div style={{backgroundColor:"#eaeded"}}>
       
        <Container style={{ minHeight: "600px" }}>
          {
            !loading&&<div className='py-5'>
             
                {
                  orders.length > 0?
                  <div>
                      <div>
                        <h3 className='text-black text-center'>Your Orders</h3>
                        <ul className={`d-flex justify-content-center gap-3 p-0 py-2 ${layoutStyle.bullets}`}>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                      <div className='rounded-4 p-2 p-md-3 bg-light'>
                        {
                          orders.map((order) => (
                            <Order key={order.id} order={order} />
                          ))
                        }
                      </div>
                  </div>
               :
                  <h5 className='text-center text-secondary'>No orders found</h5>
                
                }
            </div>
          }
        </Container>
       
      </div>
       <Footer/>
    </>
   
  );
};

export default Orders;
