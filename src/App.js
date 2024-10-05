import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { auth } from "./firebase";
import { useContextData } from "./store/useContextData";


import RequireAuth from "./Required/RequireAuth";
import CheckProductId from "./Required/CheckProductId";

import Home from "./pages/Home";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));

function App() {

  const { dispatch } = useContextData();

  const stripeKey = loadStripe(
    "pk_test_51PyF5s07KOc5i5905HdgNeZVPH73ohl7IYw33PH4IgKOLvdA6yTriczEeultxztolNUInFXCQYvNMrMI7vtTmceK00XKQPcNFG"
  );

  useEffect(() => {

    // Handle user authentication change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        payload: user || null,
      });
    });

    // Cleanup on component unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="products"
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />

        <Route element={<CheckProductId />}>
          <Route
            path="products/category/:category"
            element={
              <Suspense fallback={<Loader />}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="products/:id"
            element={
              <Suspense fallback={<Loader />}>
                <Products />
              </Suspense>
            }
          />
        </Route>

        <Route element={<RequireAuth />}>
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Loader />}>
                <Checkout />
              </Suspense>
            }
          />

          <Route
            path="/checkout/payment"
            element={
              <Suspense fallback={<Loader />}>
                <Elements stripe={stripeKey}>
                  <Payment />
                </Elements>
              </Suspense>
            }
          />

          <Route
            path="/orders"
            element={
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
