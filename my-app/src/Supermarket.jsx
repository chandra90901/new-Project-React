import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Footer';
import NavBar from './NavBar';
import Signup from './Accounts/signup';
import Login from './Accounts/login';
import Items from './Shop/items';
import Shop from "./Shop/shop";
import Category from "./pages/Category";
import Pages from "./pages/Pages";
import Home from "./Home"

const SuperMarket = () => {
    return (
        <Router>
            <NavBar />
            <menu>
                {/* <div className="container mt-5">
                    <h1>Welcome to Ram Super Market</h1>
                    <p>Your one-stop shop for fresh groceries and more!</p>
                </div> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Shop/shop" element={<Shop />} />
                    <Route path="/accounts/signup" element={<Signup />} />
                    <Route path="/accounts/login" element={<Login />} />
                    <Route path="/Shop/shop" element={<Shop />} />
                    <Route path="/Shop/items" element={<Items />} />
                    <Route path="/pages/Category" element={<Category />} />
                    <Route path="/pages/Pages" element={<Pages />} />
                </Routes>
            </menu>
            <Footer />
        </Router >
    );
};

export default SuperMarket;