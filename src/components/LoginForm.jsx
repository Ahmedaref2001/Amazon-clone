import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContextData } from "../store/useContextData";
import { useFormik } from "formik";
import { RegesterSchema, SigninSchema } from "../utl/formValidation";
import loginFormStyle from "../style/loginFormStyle.module.css";
import Cookies from "universal-cookie";


const LoginForm = () => {
  const [signIn, setSignIn] = useState(true); // Toggle between sign in and register
  const navigate = useNavigate();
  const { dispatch } = useContextData();
  const location = useLocation();
  const cookies = new Cookies();

  const from = location.state?.from || "/";

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: signIn ? SigninSchema : RegesterSchema,

    onSubmit: (values) => {
      dispatch({ type: "ADD_LOADER" });

      if (signIn) {
        // Handle sign in
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((res) => {
            toast.success("You have been logged in successfully", {
              theme: "dark",
            });
            if(cookies.get("user")){
              if(cookies.get("user").email!==res._tokenResponse.email){
                dispatch({type:"REMOVE_CART"})
                //save user data to cookies
                cookies.set('user', res._tokenResponse);
              }
            }else{
              dispatch({type:"REMOVE_CART"})
              //save user data to cookies
              cookies.set('user', res._tokenResponse);
          }
              
           
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error(error);
            toast.error(error.message, { theme: "dark" });
          })
          .finally(() => {
            dispatch({ type: "REMOVE_LOADER" });
          });
      } else {
        // Handle registration
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((res) => {
            toast.success("The account has been registered successfully", {
              theme: "dark",
            });
            //save user data to cookies
            cookies.set('user', res._tokenResponse);
            dispatch({type:"REMOVE_CART"})
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error(error);
            toast.error(error.message, { theme: "dark" });
          })
          .finally(() => {
            dispatch({ type: "REMOVE_LOADER" });
            setSignIn(true); // Reset back to sign-in after successful registration
          });
      }
    },
  });

  const handleRegester = (e) => {
    e.preventDefault()
    setSignIn(false); // Toggle between sign-in and register modes
    formik.handleSubmit(); // Reset the form when toggling modes
  };

  return (
    <div className={`mt-3 p-4 rounded-3 ${loginFormStyle.form_container}`}>
      <h3 className="mb-4">Sign in</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="your email"
            className="shadow-none"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="your password"
            className="shadow-none"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
        </Form.Group>

        <Button variant="warning" className="w-100" type="submit">
          Sign in
        </Button>
      </Form>
      <p className="my-2" style={{ fontSize: "13px" }}>
        By continuing, you agree to Amazon's Clone Conditions of Use and Privacy
        Notice.
      </p>

      <button
        className={`w-100 p-1 ${loginFormStyle.create_account_btn}`}
        onClick={handleRegester}
        type="button"
      >
        Create your Amazon Account
      </button>
    </div>
  );
};

export default LoginForm;
