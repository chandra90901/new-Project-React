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
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Shop/shop" element={<Shop />} />
                    <Route path="/Accounts/signup" element={<Signup />} />
                    <Route path="/Accounts/login" element={<Login />} />
                    <Route path="/Shop/items" element={<Items />} />
                    <Route path="/pages/Category" element={<Category />} />
                    <Route path="/pages/Pages" element={<Pages />} />
                </Routes>
            </div>
            <Footer />
        </Router >
    );
};

export default SuperMarket;