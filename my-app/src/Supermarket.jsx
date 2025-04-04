import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Signup from "./Accounts/signup";
import Login from "./Accounts/login";
import Items from "./Shop/items";
import Shop from "./Shop/shop";
import Category from "./pages/Category";
import Pages from "./pages/Pages";
import Home from "./Home";
import About from "./pages/about";
import Role from "./pages/role";
import Department from "./Department/department";

const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/Accounts/login" || location.pathname === "/Accounts/signup";

    return (
        <>
            {!isAuthPage && <NavBar />}
            <div>{children}</div>
            {!isAuthPage && <Footer />}
        </>
    );
};

const SuperMarket = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/Accounts/login" element={<Login />} />
                    <Route path="/Accounts/signup" element={<Signup />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/Shop/shop" element={<Shop />} />
                    <Route path="/Shop/items" element={<Items />} />
                    <Route path="/pages/Category" element={<Category />} />
                    <Route path="/pages/Pages" element={<Pages />} />
                    <Route path="/pages/about" element={<About />} />
                    <Route path="/pages/role" element={<Role />} />
                    <Route path="/Department/department" element={<Department />} />

                </Routes>
            </Layout>
        </Router>
    );
};

export default SuperMarket;
