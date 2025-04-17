import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Signup from "./Accounts/signup";
import Login from "./Accounts/login";
import Home from "./Home";
import About from "./pages/about";
import Role from "./pages/role";
import Department from "./Department/department";
import RoleAssigning from "./Role Assigning/roleAssigning";
import SubHeader from "./subHeader";

const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/Accounts/login" || location.pathname === "/Accounts/signup";

    return (
        <>
            {!isAuthPage && <Header />}
            {!isAuthPage && <SubHeader />}
            <div style={{ paddingTop: '70px' }}>{children}</div>
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
                    {/* <Route path="/Shop/shop" element={<Shop />} /> */}
                    {/* <Route path="/Shop/items" element={<Items />} /> */}
                    {/* <Route path="/pages/Category" element={<Category />} /> */}
                    {/* <Route path="/pages/Pages" element={<Pages />} /> */}
                    <Route path="/pages/about" element={<About />} />
                    <Route path="/pages/role" element={<Role />} />
                    <Route path="/Department/department" element={<Department />} />
                    <Route path="/RoleAssigning/roleAssigning" element={<RoleAssigning />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default SuperMarket;
