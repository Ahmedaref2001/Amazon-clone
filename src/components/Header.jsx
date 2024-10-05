import React from "react";
import { Nav, Navbar, Form, InputGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/amazonLogo.1c9be0b254d3ff1dc9e9.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import headerStyle from "../style/headerStyle.module.css";
import { useContextData } from "../store/useContextData";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Header = () => {
  const { user ,cart,searchValue} = useContextData().state;
  const { dispatch} = useContextData();
  
  //handle Sign Out
  function handleSignOut(){
    auth.signOut().then(()=>{
      toast.warning("You have successfully logged out", {
        theme: "dark",
      });
    })
  }


  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar-dark bg-dark flex-nowrap align-items-start"
      sticky="top"
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="logo-img"
            style={{ width: "100px" }}
            className="mt-1"
            loading="lazy"
          />
        </Link>

        <InputGroup className="d-flex me-2">
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="shadow-none"
            onChange={(e)=>dispatch({type:"SET_SEARCH_VALUE",payload:e.target.value})}
            value={searchValue}
          />
          <InputGroup.Text variant="outline-success" className="bg-warning">
            <IoSearchOutline className={headerStyle.searchIcon} />
          </InputGroup.Text>
        </InputGroup>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={`shadow-none ${headerStyle.navbar_toggler}`}
        />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`${headerStyle.navbar_collapse} top-100 start-0 bg-dark`}
          style={{ zIndex: "9999" }}
        >
          <Nav className="align-items-center flex-row justify-content-evenly py-3 py-md-0">

            <div className="nav-link">
                <p className={`m-0 ${headerStyle.link_first_line} ${headerStyle.user_name}`} title={user&&user.email}>
                  Hello {user ? user.email : "Guest"}
                </p>
                <Link className={`text-decoration-none m-0 fw-bold ${headerStyle.link_secend_line} ${headerStyle.nav_link}`} to={!user&&"/login"}>
                  <span onClick={user&&handleSignOut}>{user ? "Sign Out" : "Sign In"}</span>
                </Link>
            </div>

            <div className={`nav-link `}>
                <p
                  className={`m-0 ${headerStyle.link_first_line}`}
                >
                  Returns
                </p>
                <Link className={`text-decoration-none m-0 fw-bold ${headerStyle.link_secend_line} ${headerStyle.nav_link}`} to="/orders">
                  Orders
                </Link>
            </div>

              <div className="nav-link">
                <p
                  className={`m-0 ${headerStyle.link_first_line}`}
                >
                  Your
                </p>
                <Link className={`text-decoration-none m-0 fw-bold ${headerStyle.link_secend_line} ${headerStyle.nav_link}`}>
                  Prime
                </Link>
              </div>

            <Link
            className={`nav-link ${headerStyle.nav_link}`}
              to="/checkout"
            >
              <div className="d-flex align-items-center gap-2">
                <FaCartShopping className={headerStyle.cartIcon} />
                <span className={headerStyle.cartItem}>{user?cart.length:0}</span>
              </div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
