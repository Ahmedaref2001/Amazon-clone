import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../images/login-logo.png";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useContextData } from "../store/useContextData";

const Login = () => {
  const { loading } = useContextData().state;

  return (
    <>
      {loading && <Loader />}
      <div className="d-flex align-items-center flex-column">
        <Link className="mt-5" to="/">
          <img src={logo} alt="img-logo" style={{ width: "100px" }} loading="lazy"/>
        </Link>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
